using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions.DTO;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers
{
    public class GetHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            string sub = request.RequestContext?.Authorizer?.Claims["sub"];
            var promotionQuery = db.Promotions.Where(x => x.SubId == sub);
            string id = request.PathParameters?["id"];
            if (!String.IsNullOrEmpty(id))
                promotionQuery = promotionQuery.Where(x => x.Id == int.Parse(id));

            var promotions = await promotionQuery
                .Include(x => x.Facebook)
                .Include(x => x.Features)
                .Include(x => x.Ads)
                .Include(x => x.SellingPoints)
                .Include(x => x.Template)
                .ToListAsync();
            if (!String.IsNullOrEmpty(id))
                return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(promotions.Select(PromotionEntityToDtoConverter.Convert).FirstOrDefault()));

            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(promotions.Select(PromotionEntityToDtoConverter.Convert)));
        }
    }
}
