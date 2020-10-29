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
            var promotionDto = new DTO.Promotion();

            promotionDto.id = promotion.Id;
            promotionDto.name = promotion.Name;
            promotionDto.title = promotion.Title;
            promotionDto.templateId = promotion.TemplateId;
            promotionDto.templateName = promotion.Template.Name;
            promotionDto.freeText = promotion.FreeText;
            promotionDto.identityId = promotion.IdentityId;
            promotionDto.stepNumber = 1;
            promotionDto.statusId = promotion.StatusId;
            promotionDto.createDate = promotion.CreateDate?.ToString();
            promotionDto.startDate = promotion.StartDate?.ToString();
            promotionDto.charge = promotion.Charge;
            promotionDto.ad = promotion.Ads?.Select(x => new Ad { image = x.Image, text = x.Text }).FirstOrDefault();

            promotionDto.fields = new Fields
            {
                banner = promotion.Banner,
                elevatorPitch = promotion.ElevatorPitch,
                logo = promotion.Logo,
                tagLine = promotion.TagLine,
                title = promotion.Title,
            };

            promotionDto.features = promotion.Features
                ?.Select(x => new Feature { description = x.Description, title = x.Title }).ToArray();

            promotionDto.facebook = promotion.Facebook?.Select(x => new DTO.Facebook
            {
                budgetPerDayInDollars = x.BudgetPerDayInDollars.ToString(),
                includeInstagram = x.IncludeInstagram == true,
                isEnabled = x.IsEnabled == true,
                numberOfDays = x.NumberOfDays.ToString()
            }).FirstOrDefault();

            promotionDto.images = new Images
            { imageOne = promotion.ImageOne, imageTwo = promotion.ImageTwo, imageThree = promotion.ImageThree };

            promotionDto.sellingPoints = promotion.SellingPoints.Select(x => new Sellingpoint { description = x.Description, title = x.Title }).ToArray();


            return promotionDto;
        }
    }
}
