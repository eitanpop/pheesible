using System;
using System.Collections.Generic;
using System.Text;
using Amazon.Lambda.APIGatewayEvents;

namespace Pheesible.Promotions.Handlers
{
    public class HandlerFactory : IHandlerFactory
    {
        public IHandler Get(APIGatewayProxyRequest request)
        {
            if (request.HttpMethod.ToLower() == "post")
            {
                if (request.Path.Equals("/promotion/lead", StringComparison.CurrentCultureIgnoreCase))
                    return new CreateLeadHandler();
                return new CreateHandler();
            }

            if (request.HttpMethod.ToLower() == "get")
            {
                if(request.Path.Contains("/promotion/public/", StringComparison.CurrentCultureIgnoreCase))
                    return new PublicHandler();
                if (request.Path.Equals("/promotion/templates", StringComparison.CurrentCultureIgnoreCase))
                    return new TemplateGetHandler();
                return new GetHandler();
            }

            throw new Exception("Unsupported verb passed!");
        }
    }
}
