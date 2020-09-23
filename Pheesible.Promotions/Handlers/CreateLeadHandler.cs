using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers
{
    public class CreateLeadHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            var leadDto = JsonSerializer.Deserialize<DTO.Lead>(request.Body);
            db.Leads.Add(new Leads
            {
                Email = leadDto.email, FirstName = leadDto.firstName, LastName = leadDto.lastName,
                Phone = leadDto.phone, PromotionId = leadDto.promotionId
            });
            await db.SaveChangesAsync();
            return ApiGatewayHelper.GetSuccessResponse("success");
        }
    }
}
