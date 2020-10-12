﻿using System;
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
                case "post" when request.Path.Equals("/promotion/stripe", StringComparison.InvariantCultureIgnoreCase):
                    return new StripeHandler(_config);
                case "post" when request.Path.Equals("/promotion/lead", StringComparison.InvariantCultureIgnoreCase):
                    return new CreateLeadHandler();
                case "post" when request.Path.Equals("/admin/approve", StringComparison.InvariantCultureIgnoreCase):
                    return new CampaignApproveHandler();
                case "post":
                    return new CreateHandler();
                case "get" when request.Path.Contains("/admin/review", StringComparison.InvariantCultureIgnoreCase):
                    return new ReviewHandler(_config);
                case "get" when request.Path.Contains("/promotion/public/", StringComparison.InvariantCultureIgnoreCase):
                    return new PublicHandler();
                case "get" when request.Path.Equals("/promotion/templates", StringComparison.InvariantCultureIgnoreCase):
                    return new TemplateGetHandler();
                case "get":
                    return new GetHandler();
                default:
                    throw new Exception("Unsupported verb passed!");
            }
        }
    }
}
