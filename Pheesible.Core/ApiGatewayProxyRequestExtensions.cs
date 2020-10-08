using System;
using System.Collections.Generic;
using System.Text;
using Amazon.Lambda.APIGatewayEvents;

namespace Pheesible.Core
{
    public static class ApiGatewayProxyRequestExtensions
    {
        public static string GetSub(this APIGatewayProxyRequest request)
        {
            return request?.RequestContext?.Authorizer?.Claims["sub"];
        }

        public static string GetGroup(this APIGatewayProxyRequest request)
        {
            return request?.RequestContext?.Authorizer?.Claims["cognito:groups"];
        }
    }
}
