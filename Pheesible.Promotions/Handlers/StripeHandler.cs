using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Promotions.EF;
using Stripe;

namespace Pheesible.Promotions.Handlers
{
    public class StripeHandler : IHandler
    {
        private readonly ILambdaConfiguration _config;
        public StripeHandler(ILambdaConfiguration configuration)
        {
            _config = configuration;
        }
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            StripeConfiguration.ApiKey = _config.Get("Stripe:Key");
            string secret = _config.Get("Stripe:Secret");
            string body = request.Body;
           Stripe.EventUtility.ValidateSignature(body, request.Headers["Stripe-Signature"], secret);
           return ApiGatewayHelper.GetSuccessResponse("Run!");
        }
    }
}
