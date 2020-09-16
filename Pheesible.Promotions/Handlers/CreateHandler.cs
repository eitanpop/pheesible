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
    public class CreateHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            var promotionDto = JsonSerializer.Deserialize<DTO.Promotion>(request.Body);
            var promotions = new EF.Promotions
            {
                SubId = "",
                Title = promotionDto.fields.title,
                ElevatorPitch = promotionDto.fields.elevatorPitch,
                IdentityId = promotionDto.identityId,
                Banner = promotionDto.fields.banner,
                Logo = promotionDto.fields.logo,
                ImageOne = promotionDto.images.imageOne,
                ImageTwo = promotionDto.images.imageTwo,
                ImageThree = promotionDto.images.imageThree,
                FreeText = promotionDto.freeText
            };

            foreach (var sellingPoint in promotionDto.sellingPoints)
                promotions.SellingPoints.Add(new SellingPoints { Description = sellingPoint.description, Title = sellingPoint.title });

            foreach (var feature in promotionDto.features)
                promotions.Features.Add(new Features { Description = feature.description, Title = feature.title });

            await AddFocusGroups(promotionDto.promotionSettings.Facebook, db, promotions);
            await AddFocusGroups(promotionDto.promotionSettings.Instagram, db, promotions);
            await AddFocusGroups(promotionDto.promotionSettings.Tiktok, db, promotions);
            await AddFocusGroups(promotionDto.promotionSettings.Twitter, db, promotions);

            db.Promotions.Add(promotions);
            await db.SaveChangesAsync();
            return new APIGatewayProxyResponse();
        }

        private async Task AddFocusGroups(FocusGroupDto focusGroupDto, PromotionContext db, EF.Promotions promotions)
        {
            if (focusGroupDto == null)
                return;
            var focusGroup = await db.FocusGroups.SingleAsync(x => x.Name.ToLower() == focusGroupDto.Name.ToLower());
            promotions.PromotionFocusGroup.Add(new PromotionFocusGroup
            {
                BudgetPerDayInDollars = int.Parse(focusGroupDto.budgetPerDayInDollars),
                LengthInDaysOfPromotion = int.Parse(focusGroupDto.lengthInDaysOfPromotion),
                FocusGroupId = focusGroup.Id
            });
        }
    }
}
