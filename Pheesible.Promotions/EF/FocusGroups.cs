using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class FocusGroups
    {
        public FocusGroups()
        {
            PromotionFocusGroup = new HashSet<PromotionFocusGroup>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<PromotionFocusGroup> PromotionFocusGroup { get; set; }
    }
}
