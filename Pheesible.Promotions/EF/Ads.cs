using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Ads
    {
        public int Id { get; set; }
        public string Image { get; set; }
        public string Text { get; set; }
        public int PromotionId { get; set; }

        public virtual Promotions Promotion { get; set; }
    }
}
