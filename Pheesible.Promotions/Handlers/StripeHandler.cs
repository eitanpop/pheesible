using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
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

            string json = Regex.Unescape(request.Body);

            var billingDetails = System.Text.Json.JsonSerializer.Deserialize<DTO.StripeWebhookDto>(json);

            string promotionId = billingDetails.data.@object.metadata.promotionId;

            if (String.IsNullOrEmpty(promotionId))
                throw new Exception("No promotion Id returned in stripe metadata!");

            var promotion =
                await db.Promotions.SingleAsync(
                    x => x.Id == int.Parse(promotionId));

            promotion.StatusId = (int)PromotionStatus.ReadyForReview;

            await db.SaveChangesAsync();

            return ApiGatewayHelper.GetSuccessResponse("Run!");
        }
    }
}
