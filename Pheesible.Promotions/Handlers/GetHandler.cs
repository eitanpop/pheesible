using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers
{
    public class GetHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            var promotionQuery = db.Promotions.AsQueryable();

            string id = request.PathParameters?["id"];
            if (!String.IsNullOrEmpty(id))
                promotionQuery = promotionQuery.Where(x => x.Id == int.Parse(id));

            var promotions = await promotionQuery.ToListAsync();

            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(promotions));
        }
    }
}
