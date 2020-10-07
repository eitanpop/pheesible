using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pheesible.Billing.BillingProviders
{
    public interface IBillingProvider
    {
        public Task<BillingResponse> Bill(long amount, string sub, int promotionId);
    }
}
