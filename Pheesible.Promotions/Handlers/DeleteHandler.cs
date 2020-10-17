using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Promotions.EF;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pheesible.Core;

namespace Pheesible.Promotions.Handlers
{
    public class DeleteHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            string sub = request.GetSub();
            string id = request.PathParameters?["id"];
            var promotionToDelete = await db.Promotions.Where(x => x.SubId == sub && x.Id == int.Parse(id)).FirstOrDefaultAsync();
            promotionToDelete.IsActive = false;
            await db.SaveChangesAsync();

            return ApiGatewayHelper.GetSuccessResponse($"deleted promotion {id}");
        }
    }
}
