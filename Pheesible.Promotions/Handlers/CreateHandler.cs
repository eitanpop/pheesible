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
            string sub = request.RequestContext?.Authorizer?.Claims["sub"];
            bool isUpdate = promotionDto.id != null;
            var promotions = isUpdate ? await db.Promotions.FirstOrDefaultAsync(x => x.Id == promotionDto.id && x.SubId == sub) : new EF.Promotions();

            promotions.SubId = sub;
            promotions.TemplateId = promotionDto.templateId;
            promotions.TagLine = promotionDto.fields.tagLine;
            promotions.Title = promotionDto.fields.title;
            promotions.ElevatorPitch = promotionDto.fields.elevatorPitch;
            promotions.IdentityId = promotionDto.identityId;
            promotions.Banner = promotionDto.fields.banner;
            promotions.Logo = promotionDto.fields.logo;
            promotions.ImageOne = promotionDto.images.imageOne;
            promotions.ImageTwo = promotionDto.images.imageTwo;
            promotions.ImageThree = promotionDto.images.imageThree;
            promotions.FreeText = promotionDto.freeText;

            if (isUpdate)
                db.SellingPoints.RemoveRange(promotions.SellingPoints);
            foreach (var sellingPoint in promotionDto.sellingPoints)
                promotions.SellingPoints.Add(new SellingPoints { Description = sellingPoint.description, Title = sellingPoint.title });

            if (isUpdate)
                db.Features.RemoveRange(promotions.Features);
            foreach (var feature in promotionDto.features)
                promotions.Features.Add(new Features { Description = feature.description, Title = feature.title });

            if (isUpdate)
                db.PromotionFocusGroup.RemoveRange(promotions.PromotionFocusGroup);

            await AddFocusGroups(promotionDto.promotionSettings.Facebook, db, promotions);
            await AddFocusGroups(promotionDto.promotionSettings.Instagram, db, promotions);
            await AddFocusGroups(promotionDto.promotionSettings.Tiktok, db, promotions);
            await AddFocusGroups(promotionDto.promotionSettings.Twitter, db, promotions);

            if (isUpdate)
                db.Ads.RemoveRange(promotions.Ads);
            promotions.Ads.Add(new Ads { Image = promotionDto.ad.image, Text = promotionDto.ad.text });

            if (!isUpdate)
                db.Promotions.Add(promotions);

            promotions.StatusId = promotionDto.statusId == (int) PromotionStatus.WaitingForPaymentConfirmation
                ? (int) PromotionStatus.WaitingForPaymentConfirmation
                : (int) PromotionStatus.Draft;

            await db.SaveChangesAsync();
            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(new IdResponse { id = promotions.Id.ToString() }));
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
