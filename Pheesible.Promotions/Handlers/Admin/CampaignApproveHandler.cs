using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Pheesible.Core;
using Pheesible.Promotions.DTO;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers.Admin
{
    public class CampaignApproveHandler : IHandler
    {
        private readonly ILambdaConfiguration _config;

        public CampaignApproveHandler(ILambdaConfiguration config)
        {
            _config = config;
        }
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            if (request.GetGroup() != _config.AdminGroup)
                return ApiGatewayHelper.GetForbiddenResponse("Forbidden!");
            var model = JsonSerializer.Deserialize<ApproveOrReject>(request.Body);


            if (model == null)
                throw new Exception("No request body");

            var promotion = db.Promotions.Single(x => x.Id == model.id);

            if (promotion == null)
                throw new Exception($"No promotion with Id {model.id} exists");

            string action = model.action;

            PromotionStatus status;
            if (action.Equals("approve", StringComparison.InvariantCultureIgnoreCase))
                status = PromotionStatus.ReadyForAdPublish;
            else if (action.Equals("reject", StringComparison.InvariantCultureIgnoreCase))
                status = PromotionStatus.Rejected;
            else
            {
                throw new Exception($"Invalid action type: {action}");
            }

            promotion.StatusId = (int)status;
            db.Entry(promotion).State = EntityState.Modified;

            await db.SaveChangesAsync();

            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(new ResponseBody { status = "success" }));
        }
    }
}
