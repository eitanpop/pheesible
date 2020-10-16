using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Leads
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int? PromotionId { get; set; }
        public string Comments { get; set; }

        public virtual Promotions Promotion { get; set; }
    }
}
