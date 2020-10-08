using System;
using System.Collections.Generic;
using System.Text;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Pheesible.Promotions.Handlers.Admin;

namespace Pheesible.Promotions.Handlers
{
    public class HandlerFactory : IHandlerFactory
    {
        private readonly ILambdaConfiguration _config;

        public HandlerFactory(ILambdaConfiguration configuration)
        {
            _config = configuration;
        }
        public IHandler Get(APIGatewayProxyRequest request)
        {
            switch (request.HttpMethod.ToLower())
            {
                case "post" when request.Path.Equals("/promotion/stripe", StringComparison.CurrentCultureIgnoreCase):
                    return new StripeHandler(_config);
                case "post" when request.Path.Equals("/promotion/lead", StringComparison.CurrentCultureIgnoreCase):
                    return new CreateLeadHandler();
                case "post":
                    return new CreateHandler();
                case "get" when request.Path.Contains("/admin/review"):
                    return new ReviewHandler(_config);
                case "get" when request.Path.Contains("/promotion/public/", StringComparison.CurrentCultureIgnoreCase):
                    return new PublicHandler();
                case "get" when request.Path.Equals("/promotion/templates", StringComparison.CurrentCultureIgnoreCase):
                    return new TemplateGetHandler();
                case "get":
                    return new GetHandler();
                default:
                    throw new Exception("Unsupported verb passed!");
            }
        }
    }
}
