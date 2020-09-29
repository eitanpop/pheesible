using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions.EF;

namespace Pheesible.Scheduler.Jobs.Promotion
{
    public class PromotionPublisher : IPromotionPublisher
    {
        private readonly IFacebookApi _facebookApi;
        public PromotionPublisher(IFacebookApi facebookApi)
        {
            _facebookApi = facebookApi;
        }

        public async Task<bool> PublishToFaceBook(string name, string landingPageLink, Ads ad, PromotionFocusGroup facebook)
        {
            var adSet = await _facebookApi.CreateAdSet(name, facebook.LengthInDaysOfPromotion, facebook.BudgetPerDayInDollars * 100);
            byte[] adImage = null;
            var image = await _facebookApi.CreateAdImageObject(adImage, ad.Image);
            var adCreative = await _facebookApi.CreateAdCreative(name,image, landingPageLink, ad.Text);
            var facebookAd = await _facebookApi.CreateAd(name, adSet.id, adCreative.id);
            return true;
        }

        public async Task<bool> PublishToInstagram(string name, string landingPageLink, Ads ad, PromotionFocusGroup instagram)
        {
            return true;
        }

        public async Task<bool> PublishToGoogle(string name, string landingPageLink, Ads ad, PromotionFocusGroup google)
        {
            return true;
        }
    }
}
