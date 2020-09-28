using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Pheesible.Promotions.DTO;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions
{
    public static class PromotionEntityToDtoConverter
    {
        public static DTO.Promotion Convert(EF.Promotions promotion)
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
                statusId = promotion.StatusId,
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

       
        private static PromotionFocusGroup GetFocusGroupByName(EF.Promotions promotion, string name)
            => promotion.PromotionFocusGroup.FirstOrDefault(x => x.FocusGroup.Name.ToLower() == name.ToLowerInvariant());

        private static T GetFocusGroupDto<T>(EF.Promotions promotion) where T : FocusGroupDto, new()
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
