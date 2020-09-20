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
    public class GetHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            var promotionQuery = db.Promotions.AsQueryable();

            string id = request.PathParameters?["id"];
            if (!String.IsNullOrEmpty(id))
                promotionQuery = promotionQuery.Where(x => x.Id == int.Parse(id));

            var promotions = await promotionQuery
                .Include(x => x.Features)
                .Include(x => x.Ads)
                .Include(x => x.PromotionFocusGroup).ThenInclude(y => y.FocusGroup)
                .Include(x => x.SellingPoints)
                .Include(x=>x.Template)
                .ToListAsync();
            if (!String.IsNullOrEmpty(id))
                return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(promotions.Select(ConvertPromotionToDto).FirstOrDefault()));

            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(promotions.Select(ConvertPromotionToDto)));
        }

        private DTO.Promotion ConvertPromotionToDto(EF.Promotions promotion)
        {
            var promotionDto = new DTO.Promotion
            {
                id = promotion.Id,
                title = promotion.Title,
                templateId = promotion.TemplateId,
                templateName = promotion.Template.Name,
                freeText = promotion.FreeText,
                identityId = promotion.IdentityId,
                stepNumber = 1,
                ad = promotion.Ads?.Select(x => new Ad { image = x.Image, text = x.Text }).FirstOrDefault(),

                fields = new Fields
                {
                    banner = promotion.Banner,
                    elevatorPitch = promotion.ElevatorPitch,
                    logo = promotion.Logo,
                    tagLine = promotion.TagLine,
                    title = promotion.Title,
                },

                features = promotion.Features
                    ?.Select(x => new Feature { description = x.Description, title = x.Title }).ToArray(),

                images = new Images
                { imageOne = promotion.ImageOne, imageTwo = promotion.ImageTwo, imageThree = promotion.ImageThree },

                promotionSettings = new Promotionsettings
                {
                    Facebook = GetFocusGroupDto<Facebook>(promotion),
                    Tiktok = GetFocusGroupDto<Tiktok>(promotion),
                    Instagram = GetFocusGroupDto<Instagram>(promotion),
                    Twitter = GetFocusGroupDto<Twitter>(promotion)
                },
                sellingPoints = promotion.SellingPoints.Select(x => new Sellingpoint { description = x.Description, title = x.Title }).ToArray(),
            };

            return promotionDto;
        }

        private PromotionFocusGroup GetFocusGroupByName(EF.Promotions promotion, string name)
        => promotion.PromotionFocusGroup.FirstOrDefault(x => x.FocusGroup.Name.ToLower() == name.ToLowerInvariant());

        private T GetFocusGroupDto<T>(EF.Promotions promotion) where T : FocusGroupDto, new()
        {
            var focusGroup = new T();
            var promotionFocusGroup = GetFocusGroupByName(promotion, focusGroup.Name);
            if (promotionFocusGroup == null)
                return null;
            focusGroup.lengthInDaysOfPromotion = promotionFocusGroup.LengthInDaysOfPromotion.ToString();
            focusGroup.budgetPerDayInDollars = promotionFocusGroup.BudgetPerDayInDollars.ToString();

            return focusGroup;
        }
    }
}
