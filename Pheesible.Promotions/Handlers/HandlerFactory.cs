using System;
using System.Collections.Generic;
using System.Text;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions.Handlers.Admin;

namespace Pheesible.Promotions.Handlers
{
    public class HandlerFactory : IHandlerFactory
    {
        private readonly ILambdaConfiguration _config;
        private readonly IFacebookApi _facebookApi;

        public HandlerFactory(ILambdaConfiguration configuration, IFacebookApi facebookApi)
        {
            _config = configuration;
            _facebookApi = facebookApi;
        }
        public IHandler Get(APIGatewayProxyRequest request)
        {
            if(request?.HttpMethod == null)
                return new KeepAliveHandler();
            switch (request.HttpMethod.ToLower())
            {
                case "post" when request.Path.Equals("/promotion/stripe", StringComparison.InvariantCultureIgnoreCase):
                    return new StripeHandler(_config);
                case "post" when request.Path.Equals("/promotion/lead", StringComparison.InvariantCultureIgnoreCase):
                    return new CreateLeadHandler();
                case "post" when request.Path.Equals("/admin/approve", StringComparison.InvariantCultureIgnoreCase):
                    return new CampaignApproveHandler(_config);
                case "post":
                    return new CreateHandler();
                case "get" when request.Path.Contains("/report", StringComparison.InvariantCultureIgnoreCase):
                    return new ReportHandler(_facebookApi);
                case "get" when request.Path.Contains("/admin/review", StringComparison.InvariantCultureIgnoreCase):
                    return new ReviewHandler(_config);
                case "get" when request.Path.Contains("/promotion/public/", StringComparison.InvariantCultureIgnoreCase):
                    return new PublicHandler();
                case "get" when request.Path.Equals("/promotion/templates", StringComparison.InvariantCultureIgnoreCase):
                    return new TemplateGetHandler();
                case "get":
                    return new GetHandler();
                case "delete" when request.Path.Contains("/promotion", StringComparison.InvariantCultureIgnoreCase):
                    return new DeleteHandler();
                default:
                    throw new Exception("Unsupported verb passed!");
            }
        }
    }
}
