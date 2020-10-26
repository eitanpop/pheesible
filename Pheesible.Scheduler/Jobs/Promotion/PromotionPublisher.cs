using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Internal;
using Pheesible.Integrations.AWS;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions.EF;
using Pheesible.Promotions.Extensions;

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

        public async Task<bool> PublishToFaceBook(Promotions.EF.Promotions promotion, string landingPageLink, Facebook facebook)
        {
            string name = promotion.Id.ToString();
            var ad = promotion.Ads.First();
            facebook.AdSetId = (await _facebookApi.CreateAdSet(name, facebook.NumberOfDays, facebook.BudgetPerDayInDollars * 100, facebook.IncludeInstagram == true))?.id;
            string s3key = promotion.GetAdImageS3Key();
            byte[] adImage = await _s3.GetObject(_config.BucketName, s3key);
            var image = await _facebookApi.CreateAdImageObject(adImage, ad.Image);
            facebook.CreativeId = (await _facebookApi.CreateAdCreative(name, image, landingPageLink, ad.Text))?.id;
            facebook.AdId = (await _facebookApi.CreateAd(name, facebook.AdSetId, facebook.CreativeId))?.id;
            return true;
        }
    }
}
