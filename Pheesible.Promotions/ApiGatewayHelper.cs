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
                StatusCode = (int) HttpStatusCode.OK,
                Headers = new Dictionary<string, string>
                {
                    {"Content-Type", "application/json"}, {"Access-Control-Allow-Headers", "*"},
                    {"Access-Control-Allow-Origin", "*"}
                }
            };
        }
    }
}
