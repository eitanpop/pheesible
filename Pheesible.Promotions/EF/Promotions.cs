using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Promotions
    {
        public Promotions()
        {
            Features = new HashSet<Features>();
            PromotionFocusGroup = new HashSet<PromotionFocusGroup>();
            SellingPoints = new HashSet<SellingPoints>();
        }

        public int Id { get; set; }
        public string SubId { get; set; }
        public string Title { get; set; }
        public string ElevatorPitch { get; set; }
        public string Logo { get; set; }
        public string Banner { get; set; }
        public string IdentityId { get; set; }

        public virtual ICollection<Features> Features { get; set; }
        public virtual ICollection<PromotionFocusGroup> PromotionFocusGroup { get; set; }
        public virtual ICollection<SellingPoints> SellingPoints { get; set; }
    }
}
