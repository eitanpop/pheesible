using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions;
using Pheesible.Promotions.EF;

namespace Pheesible.Scheduler.Jobs.Promotion
{
    public class PromotionJob : IJob
    {
        private readonly IPromotionPublisher _promotionPublisher;
        private readonly ILambdaConfiguration _config;
        public PromotionJob(IPromotionPublisher promotionPublisher, ILambdaConfiguration configuration)
        {
            _promotionPublisher = promotionPublisher;
            _config = configuration;
        }

        public async Task<JobResponse> Run(PromotionContext db)
        {
            var response = new JobResponse { StartTime = DateTime.UtcNow, JobName = "Promotion" };
            try
            {
                var promotionsToBePublished = await db.Promotions
                    .Include(x => x.PromotionFocusGroup).ThenInclude(x => x.FocusGroup)
                    .Include(x => x.Ads)
                    .Where(x => x.StatusId == (int)PromotionStatus.ReadyForAdPublish).ToListAsync();
                if (promotionsToBePublished.Any())
                {
                    foreach (var promotion in promotionsToBePublished)
                    {
                        var facebook =
                            promotion.PromotionFocusGroup.FirstOrDefault(x => x.FocusGroup.Name.ToLower() == "facebook");
                        var insta = promotion.PromotionFocusGroup.FirstOrDefault(x => x.FocusGroup.Name.ToLower() == "instagram");
                        var google = promotion.PromotionFocusGroup.FirstOrDefault(x => x.FocusGroup.Name.ToLower() == "google");

                        string name = promotion.Id.ToString();
                        string landingPageLink = _config.LandingPageLink.Replace("{PROMOTION_ID}", promotion.Id.ToString());
                        var ad = promotion.Ads.FirstOrDefault();
                        if (facebook != null)
                            await _promotionPublisher.PublishToFaceBook(promotion, landingPageLink, facebook);
                        if (insta != null)
                            await _promotionPublisher.PublishToInstagram(promotion, landingPageLink, insta);
                        if (google != null)
                            await _promotionPublisher.PublishToGoogle(promotion, landingPageLink, google);
                    }
                }
                else
                {
                    response.IsSuccess = true;
                    response.ResultSummary = "No records were processed";
                }

                response.EndTime = DateTime.UtcNow;
                return response;
            }
            catch (Exception ex)
            {
                response.EndTime = DateTime.UtcNow;
                response.ResultSummary = ex.Message;
                response.AdditionalInformation = ex.Message;
                return response;
            }
        }

        private PromotionFocusGroup GetPromotionFocusGroup(Promotions.EF.Promotions promotion, IList<FocusGroups> focusGroups, string name)
        {
            return promotion.PromotionFocusGroup.FirstOrDefault(x =>
                focusGroups.Any(y => y.Name.ToLower() == name.ToLower() && x.FocusGroupId == y.Id));
        }
    }
}
