using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PheesibleApi.Models
{
    public class PromotionSettings
    {
        public int BudgetPerDayInDollars { get; set; }

        public int LengthInDaysOfPromotion { get; set; }
    }
}
