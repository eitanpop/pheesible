using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Facebook
    {
        public long Id { get; set; }
        public int PromotionId { get; set; }
        public string CampaignId { get; set; }
        public string AdSetId { get; set; }
        public string CreativeId { get; set; }
        public int NumberOfDays { get; set; }
        public int BudgetPerDayInDollars { get; set; }
        public bool? IncludeInstagram { get; set; }
        public bool? IsEnabled { get; set; }
        public string AdId { get; set; }

        public virtual Promotions Promotion { get; set; }
    }
}
