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
                name = promotion.Name,
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

                facebook = promotion.Facebook?.Select(x => new DTO.Facebook
                {
                    budgetPerDayInDollars = x.BudgetPerDayInDollars.ToString(),
                    includeInstagram = x.IncludeInstagram == true,
                    isEnabled = x.IsEnabled == true,
                    numberOfDays = x.NumberOfDays.ToString()
                }).FirstOrDefault(),

                images = new Images
                { imageOne = promotion.ImageOne, imageTwo = promotion.ImageTwo, imageThree = promotion.ImageThree },

                sellingPoints = promotion.SellingPoints.Select(x => new Sellingpoint { description = x.Description, title = x.Title }).ToArray(),
            };

            return promotionDto;
        }
    }
}
