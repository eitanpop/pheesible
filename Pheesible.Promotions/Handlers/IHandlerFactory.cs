using System;
using System.Collections.Generic;
using System.Text;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

namespace Pheesible.Promotions.Handlers
{
    public interface IHandlerFactory
    {
        IHandler Get(APIGatewayProxyRequest request);
    }
}
