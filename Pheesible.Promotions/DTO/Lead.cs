using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions.DTO
{
    public class Lead
    {
        public int promotionId { get; set; }
        public string firstName { get; set; }
        public string lastName { get; set; }
        public string email { get; set; }
        public string phone { get; set; }
    }
}
