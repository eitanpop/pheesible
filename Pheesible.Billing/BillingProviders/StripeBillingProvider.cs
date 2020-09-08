using System;
using System.Collections.Generic;
using System.Text;
using Stripe;

namespace Pheesible.Billing.BillingProviders
{
    public class StripeBillingProvider : IBillingProvider
    {
        private readonly ILambdaConfiguration _configuration;
        public StripeBillingProvider(ILambdaConfiguration configuration)
        {
            _configuration = configuration;
        }
        public BillingResponse Bill(int amount)
        {
            StripeConfiguration.ApiKey = _configuration.StripeSecret;
            var options = new PaymentIntentCreateOptions
            {
                Amount = amount,
                Currency = "usd",
                // Verify your integration in this guide by including this parameter
                Metadata = new Dictionary<string, string>
                {
                    { "integration_check", "accept_a_payment" },
                },
            };

            var service = new PaymentIntentService();
            var paymentIntent = service.Create(options);

            return new BillingResponse(BillingStatus.Success, paymentIntent.ClientSecret);
        }
    }
}
