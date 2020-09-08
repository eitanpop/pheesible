using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Billing.BillingProviders
{
    public class BillingResponse
    {
        public BillingResponse(BillingStatus status, string message)
        {
            Status = status;
            Message = message;
        }

        public BillingStatus Status { get;}
        public string Message { get; }

    }

}
