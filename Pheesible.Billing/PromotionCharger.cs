using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pheesible.Billing.DTO;

namespace Pheesible.Billing
{
    public class PromotionCharger : IPromotionCharger
    {
        public async Task<long> Bill(Promotion promotion)
        {
            return 5000;
        }
    }
}
