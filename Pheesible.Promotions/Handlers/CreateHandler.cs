using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers
{
    public class CreateHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            var promotionDto = JsonSerializer.Deserialize<DTO.Promotion>(request.Body);
            var promotions = new EF.Promotions
            {
                SubId = "",
                Title = promotionDto.fields.title,
               // LengthInDaysToRun = int.Parse(promotionDto.promotionSettings.lengthInDaysOfPromotion),
               // BudgetPerDayInDollars = int.Parse(promotionDto.promotionSettings.budgetPerDayInDollars),
                ElevatorPitch = promotionDto.fields.elevatorPitch
            };

            foreach (var sellingPoint in promotionDto.sellingPoints)
                promotions.SellingPoints.Add(new SellingPoints { Description = sellingPoint.description, Title = sellingPoint.title });

            foreach (var feature in promotionDto.features)
                promotions.Features.Add(new Features { Description = feature.description, Title = feature.title });
            db.Promotions.Add(promotions);
            await db.SaveChangesAsync();
            return new APIGatewayProxyResponse();
        }
    }
}
