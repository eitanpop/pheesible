using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using Amazon.Lambda.APIGatewayEvents;

namespace Pheesible.Promotions
{
    public static class ApiGatewayHelper
    {
        public static APIGatewayProxyResponse GetSuccessResponse(string responseData)
        {
            return new APIGatewayProxyResponse
            {
                Body = responseData,
                StatusCode = (int) HttpStatusCode.OK
            };
        }
    }
}
