using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Billing.BillingProviders
{
    public interface IBillingProvider
    {
        public BillingResponse Bill(int amount);
    }
}
