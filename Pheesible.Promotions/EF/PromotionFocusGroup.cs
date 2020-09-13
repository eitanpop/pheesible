using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class PromotionFocusGroup
    {
        public int Id { get; set; }
        public int PromotionId { get; set; }
        public int? FocusGroupId { get; set; }
        public int? LengthInDaysOfPromotion { get; set; }
        public int? BudgetPerDayInDollars { get; set; }

        public virtual FocusGroups FocusGroup { get; set; }
        public virtual Promotions Promotion { get; set; }
    }
}
