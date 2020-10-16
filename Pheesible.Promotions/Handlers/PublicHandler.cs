using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions.DTO;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers
{
    public class PublicHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            string id = request.PathParameters?["id"];
            var promotion = await db.Promotions
                .Where(x => x.Id.ToString() == id)
                .Include(x => x.Features)
                .Include(x => x.Ads)
                .Include(x => x.SellingPoints)
                .Include(x => x.Template)
                .Where(x => x.StatusId != (int)PromotionStatus.Draft && x.StatusId != (int)PromotionStatus.ReadyForReview && x.StatusId != (int)PromotionStatus.Rejected)
                .FirstOrDefaultAsync();
            PublicPromotion publicPromotion = PromotionEntityToDtoConverter.Convert(promotion);
            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(publicPromotion));
        }
    }
}
