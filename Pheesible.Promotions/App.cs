using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions
{
    public class App : IApp
    {
        private ILambdaConfiguration _config;
        private PromotionContext _db;
        public App(ILambdaConfiguration configuration, PromotionContext context)
        {
            _config = configuration;
            _db = context;
        }

        public async Task Run(string method, string body)
        {
            var promotionDto = JsonSerializer.Deserialize<DTO.Promotion>(body);
            var promotions = new EF.Promotions
            {
                SubId = "",
                Title = promotionDto.fields.title,
                LengthInDaysToRun = int.Parse(promotionDto.promotionSettings.lengthInDaysOfPromotion),
                BudgetPerDayInDollars = int.Parse(promotionDto.promotionSettings.budgetPerDayInDollars),
                ElevatorPitch = promotionDto.fields.elevatorPitch
            };

            foreach(var sellingPoint in promotionDto.sellingPoints)
                promotions.SellingPoints.Add(new SellingPoints{Description = sellingPoint.description, Title=sellingPoint.title});

            foreach(var feature in promotionDto.features)
                promotions.Features.Add(new Features{Description = feature.description, Title=feature.title});

            /*
            var features = new List<Features>
            {
                new Features {Description = "Feature 1 description", Title = "Feature 1 title"},
                new Features {Description = "Feature 2 description", Title = "Feature 2 title"},
                new Features {Description = "Feature 3 description", Title = "Feature 3 title"},
            };

            var sellingPoints = new List<SellingPoints>
            {
                new SellingPoints{Description = "SellingPoint 1 description", Title = "SellingPoint 1 title"},
                new SellingPoints{Description = "SellingPoint 2 description", Title = "SellingPoint 2 title"},
                new SellingPoints{Description = "SellingPoint 3 description", Title = "SellingPoint 3 title"}
            };

            var promotions = new EF.Promotions
            {
                BudgetPerDayInDollars = 20,
                ElevatorPitch = "This is my elevator pitch homes",
                Features = features,
                SellingPoints = sellingPoints,
                LengthInDaysToRun = 5,
                SubId = "asdfasdfasdf",
                Title = "title of promotion"
            };
            */
            _db.Promotions.Add(promotions);
            await _db.SaveChangesAsync();
        }
    }
}
