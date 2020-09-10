using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Promotions
    {
        public Promotions()
        {
            Features = new HashSet<Features>();
            SellingPoints = new HashSet<SellingPoints>();
        }

        public int Id { get; set; }
        public string SubId { get; set; }
        public string Title { get; set; }
        public string ElevatorPitch { get; set; }
        public int? BudgetPerDayInDollars { get; set; }
        public int? LengthInDaysToRun { get; set; }

        public virtual ICollection<Features> Features { get; set; }
        public virtual ICollection<SellingPoints> SellingPoints { get; set; }
    }
}
