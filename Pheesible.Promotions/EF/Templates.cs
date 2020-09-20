using System;
using System.Collections.Generic;

namespace Pheesible.Promotions.EF
{
    public partial class Templates
    {
        public Templates()
        {
            Promotions = new HashSet<Promotions>();
        }

        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<Promotions> Promotions { get; set; }
    }
}
