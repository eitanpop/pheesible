using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Core;
using Pheesible.Promotions.DTO;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers.Admin
{
    public class CampaignApproveHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            if (!ApiGatewayHelper.IsAdmin(request)) return ApiGatewayHelper.GetForbiddenResponse("Not an admin");
            string id = JsonSerializer.Deserialize<IdRequest>(request.Body)?.id;

            var promotion = db.Promotions.Single(x => x.Id == int.Parse(id));

            promotion.StatusId = (int)PromotionStatus.ReadyForAdPublish;
            await db.SaveChangesAsync();

            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(new ResponseBody { status = "success" }));
        }
    }
}
