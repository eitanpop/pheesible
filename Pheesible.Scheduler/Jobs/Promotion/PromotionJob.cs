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
                var promotion = await db.Promotions
                    .Include(x => x.Facebook)
                    .Include(x => x.Ads)
                    .FirstOrDefaultAsync(x => x.StatusId == (int)PromotionStatus.ReadyForAdPublish);
                if (promotion != null)
                {
                    promotion.StatusId = (int)PromotionStatus.Publishing;
                    await db.SaveChangesAsync();
                    var facebook = promotion.Facebook.FirstOrDefault();
                    string landingPageLink = _config.LandingPageLink.Replace("{PROMOTION_ID}", promotion.Id.ToString());

                    if (facebook != null)
                        await _promotionPublisher.PublishToFaceBook(promotion, landingPageLink, facebook);
                    /*  if (insta != null)
                          await _promotionPublisher.PublishToInstagram(promotion, landingPageLink, insta);
                      if (google != null)
                          await _promotionPublisher.PublishToGoogle(promotion, landingPageLink, google);*/
                    promotion.StatusId = (int)PromotionStatus.Running;
                    promotion.StartDate = DateTime.UtcNow;
                    await db.SaveChangesAsync();
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
                response.IsSuccess = false;
                response.EndTime = DateTime.UtcNow;
                response.ResultSummary = ex.Message;
                response.AdditionalInformation = ex.Message;
                return response;
            }
        }
    }
}
