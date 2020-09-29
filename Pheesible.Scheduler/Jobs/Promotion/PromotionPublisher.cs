using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;
using Pheesible.Integrations.AWS;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions.EF;

namespace Pheesible.Scheduler.Jobs.Promotion
{
    public class PromotionPublisher : IPromotionPublisher
    {
        private readonly IFacebookApi _facebookApi;
        private readonly IS3 _s3;
        private readonly ILambdaConfiguration _config;
        public PromotionPublisher(IFacebookApi facebookApi, IS3 s3, ILambdaConfiguration configuration)
        {
            _facebookApi = facebookApi;
            _s3 = s3;
            _config = configuration;
        }

        public async Task<bool> PublishToFaceBook(Promotions.EF.Promotions promotion, string landingPageLink, PromotionFocusGroup facebook)
        {
            string name = promotion.Id.ToString();
            var ad = promotion.Ads.First();
            var adSet = await _facebookApi.CreateAdSet(name, facebook.LengthInDaysOfPromotion, facebook.BudgetPerDayInDollars * 100);
            string s3key = $"protected/{promotion.IdentityId}/{ad.Image}";
            byte[] adImage = await _s3.GetObject(_config.BucketName, s3key);
            var image = await _facebookApi.CreateAdImageObject(adImage, ad.Image);
            var adCreative = await _facebookApi.CreateAdCreative(name, image, landingPageLink, ad.Text);
            var facebookAd = await _facebookApi.CreateAd(name, adSet.id, adCreative.id);
            return true;
        }

        public async Task<bool> PublishToInstagram(Promotions.EF.Promotions promotion, string landingPageLink,PromotionFocusGroup instagram)
        {
            return true;
        }

        public async Task<bool> PublishToGoogle(Promotions.EF.Promotions promotion, string landingPageLink, PromotionFocusGroup google)
        {
            return true;
        }
    }
}
