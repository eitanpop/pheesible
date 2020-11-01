using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Core;
using Pheesible.Promotions.EF;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions.DTO;
using System.Text.Json;

namespace Pheesible.Promotions.Handlers
{
    public class ReportHandler : IHandler
    {
        private readonly IFacebookApi _facebookApi;
        public ReportHandler(IFacebookApi facebookApi)
        {
            _facebookApi = facebookApi;
        }

        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            string sub = request.GetSub();
            string id = request.PathParameters?["id"];
            if (String.IsNullOrEmpty(id))
                return ApiGatewayHelper.GetBadRequestResponse("Must pass an id in the query string");
            var promotion = await db.Promotions.Include(x => x.Facebook).Include(x => x.Template).Where(x => x.Id == int.Parse(id) && x.IsActive && x.SubId == sub).AsNoTracking().SingleOrDefaultAsync();

            if (promotion == null)
            {
                return ApiGatewayHelper.GetErrorResponse($"Cannot find promotion: {id}");
            }

            var facebook = promotion.Facebook.FirstOrDefault();
            var adSetId = facebook?.AdSetId;
            var adCreativeId = facebook?.CreativeId;

            var report = await _facebookApi.GetReportForAdSet(adSetId, new[] { "actions", "clicks", "date_start", "date_stop", "impressions", "spend", "reach" });

            var reportDto = new ReportDto();
            reportDto.entries = report.data.Select(x => new Entry { age = x.age, clicks = x.clicks, gender = x.gender, impressions = x.impressions, spend = x.spend, reach = x.reach })?.ToList();
            var fbUrl = $"https://www.facebook.com/{(await _facebookApi.GetAdCreative(adCreativeId, new[] { "effective_object_story_id" }))?.effective_object_story_id}";
            reportDto.facebookUrl = fbUrl;
            reportDto.promotion = PromotionEntityToDtoConverter.Convert(promotion);
            var leads = await db.Leads.Where(x => x.PromotionId == promotion.Id).AsNoTracking().ToListAsync();
            reportDto.leads = leads.Select(x => new Lead { comments = x.Comments, email = x.Email, firstName = x.FirstName, lastName = x.LastName, phone = x.Phone, promotionId = x.PromotionId.Value }).ToList();

            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(reportDto));
        }
    }
}
