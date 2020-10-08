using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Pheesible.Core;
using Pheesible.Promotions.DTO;
using Pheesible.Promotions.EF;
using Facebook = Pheesible.Promotions.EF.Facebook;


namespace Pheesible.Promotions.Handlers
{
    public class CreateHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            var promotionDto = JsonSerializer.Deserialize<DTO.Promotion>(request.Body);
            string sub = request.GetSub();
            bool isUpdate = promotionDto.id != null;
            var promotions = isUpdate ? await db.Promotions.FirstOrDefaultAsync(x => x.Id == promotionDto.id && x.SubId == sub) : new EF.Promotions();
            if (String.IsNullOrEmpty(sub))
                throw new Exception("Must contain a sub!!");
            promotions.SubId = sub;
            promotions.Name = promotionDto.name;
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
                promotions.SellingPoints.Add(new SellingPoints { Description = sellingPoint?.description, Title = sellingPoint?.title });

            if (isUpdate)
                db.Features.RemoveRange(promotions.Features);
            foreach (var feature in promotionDto.features)
                promotions.Features.Add(new Features { Description = feature.description, Title = feature.title });

            if (isUpdate)
                db.Facebook.RemoveRange(promotions.Facebook);
            if (promotionDto.facebook?.numberOfDays != null)
            {
                var facebookDto = promotionDto.facebook;
                promotions.Facebook.Add(new Facebook
                {
                    BudgetPerDayInDollars = int.Parse(facebookDto.budgetPerDayInDollars),
                    IncludeInstagram = facebookDto.includeInstagram,
                    IsEnabled = facebookDto.isEnabled,
                    NumberOfDays = int.Parse(facebookDto.numberOfDays)
                });
            }

            if (isUpdate)
                db.Ads.RemoveRange(promotions.Ads);
            promotions.Ads.Add(new Ads { Image = promotionDto.ad.image, Text = promotionDto.ad.text });

            if (!isUpdate)
                db.Promotions.Add(promotions);


            promotions.StatusId = (int)PromotionStatus.Draft;

            if (promotions.CreateDate == null)
                promotions.CreateDate = DateTime.UtcNow; ;

            await db.SaveChangesAsync();
            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(new IdResponse { id = promotions.Id.ToString() }));
        }

    }
}
