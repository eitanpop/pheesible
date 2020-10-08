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
            return GetResponse(responseData, HttpStatusCode.OK);

        }

        public static APIGatewayProxyResponse GetForbiddenResponse(string responseData)
        {
            return GetResponse(responseData, HttpStatusCode.Forbidden);
        }

        private static APIGatewayProxyResponse GetResponse(string responseData, HttpStatusCode statusCode)
        {
            return new APIGatewayProxyResponse
            {
                Body = responseData,
                StatusCode = (int)statusCode,
                Headers = new Dictionary<string, string>
                {
                    {"Content-Type", "application/json"}, {"Access-Control-Allow-Headers", "*"},
                    {"Access-Control-Allow-Origin", "*"}
                }
            };
        }
    }
}
