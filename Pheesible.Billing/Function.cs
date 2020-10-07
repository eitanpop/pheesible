using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
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
        private readonly IBillingProvider _billingProvider;
        private readonly IPromotionCharger _promotionCharger;

        public Function(IBillingProvider billingProvider, IPromotionCharger promotionCharger)
        {
            _billingProvider = billingProvider;
            _promotionCharger = promotionCharger;
        }
        public Function()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();
            _billingProvider = serviceProvider.GetService<IBillingProvider>();
            _promotionCharger = serviceProvider.GetService<IPromotionCharger>(); ;
        }

        private void ConfigureServices(ServiceCollection serviceCollection)
        {
            // add dependencies here
            serviceCollection.AddTransient<ILambdaConfiguration, LambdaConfiguration>();
            serviceCollection.AddTransient<IBillingProvider, StripeBillingProvider>();
            serviceCollection.AddTransient<IPromotionCharger, PromotionCharger>();

        }

        /// <summary>
        /// A function that takes an amount and bills the user using the injected billing provider
        /// </summary>
        /// <param name="amount"></param>
        /// <param name="context"></param>
        /// <returns></returns>
        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            context.Logger.Log($"request: {JsonSerializer.Serialize(request)}");
            context.Logger.Log($"context: {JsonSerializer.Serialize(context)}");

            var promotionDto = JsonSerializer.Deserialize<DTO.Promotion>(request.Body);
            string sub = request.RequestContext?.Authorizer?.Claims["sub"];
            long amount = await _promotionCharger.Bill(promotionDto);
            return new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = $"{{\"secret\":\"{(await _billingProvider.Bill(amount, sub, int.Parse(promotionDto.id)))?.Message}\"}}",
                Headers = new Dictionary<string, string>
                {
                    {"Content-Type", "application/json"}, {"Access-Control-Allow-Headers", "*"},
                    {"Access-Control-Allow-Origin", "*"}
                }
            };

        }
    }
}
