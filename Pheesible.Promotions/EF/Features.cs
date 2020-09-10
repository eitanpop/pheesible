using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Features
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int PromotionId { get; set; }

        public virtual Promotions Promotion { get; set; }
    }
}
