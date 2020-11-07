using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;

namespace Pheesible.Promotions.Extensions
{
    public static class PromotionExtension
    {
        public static string GetAdImageS3Key(this Pheesible.Promotions.EF.Promotions promotion)
        {
            var ad = promotion.Ads.FirstOrDefault();
            return ad?.Image == null ? null : $"protected/{promotion.IdentityId}/{ad.Image}";
        }
    }
}
