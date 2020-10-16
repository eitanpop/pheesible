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
            if (ad == null || ad.Image == null)
                return $"public/templates/{promotion.TemplateId}/Ad/image.png";
            return $"protected/{promotion.IdentityId}/{ad.Image}";
        }
    }
}
