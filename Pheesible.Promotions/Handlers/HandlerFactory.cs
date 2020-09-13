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
                return new CreateHandler();

            if (request.HttpMethod.ToLower() == "get")
                return new GetHandler();

            throw new Exception("Unsupported verb passed!");
        }
    }
}
