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
        private IFacebookApi _facebookApi;
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
            var promotion = await db.Promotions.Include(x => x.Facebook).Where(x => x.IsActive && x.SubId == sub).AsNoTracking().SingleOrDefaultAsync();

            if(promotion == null)
            {
                return ApiGatewayHelper.GetErrorResponse($"Cannot find promotion: {id}");
            }

            string adSetId = promotion.Facebook.FirstOrDefault().AdSetId;

            var report = await _facebookApi.GetReportForAdSet(adSetId, new string[] { "actions", "clicks", "date_start", "date_stop", "impressions", "spend" });

            var reportDto = report.data.Select(x => new Entry { age = x.age, clicks = x.clicks, gender = x.gender, impressions = x.impressions, spend = x.spend });

            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(reportDto));
        }
    }
}
