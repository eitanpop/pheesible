using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Microsoft.Extensions.DependencyInjection;
using Pheesible.Billing.BillingProviders;
using Stripe;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Pheesible.Billing
{
    public class Function
    {
        private IBillingProvider BillingProvider { get; }

        public Function(IBillingProvider billingProvider)
        {
            BillingProvider = billingProvider;
        }
        public Function()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();
            BillingProvider = serviceProvider.GetService<IBillingProvider>();
        }

        private void ConfigureServices(ServiceCollection serviceCollection)
        {
            // add dependencies here
            serviceCollection.AddTransient<ILambdaConfiguration, LambdaConfiguration>();
            serviceCollection.AddTransient<IBillingProvider, StripeBillingProvider>();

        }

        /// <summary>
        /// A function that takes an amount and bills the user using the injected billing provider
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public string FunctionHandler(int amount, ILambdaContext context)
        {
            return BillingProvider.Bill(amount)?.Message;
        }
    }
}
