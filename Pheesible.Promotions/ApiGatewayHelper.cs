using System;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Core;

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

        public static APIGatewayProxyResponse GetErrorResponse(string responseData)
        {
            return GetResponse(responseData, HttpStatusCode.InternalServerError);
        }
        public static APIGatewayProxyResponse GetBadRequestResponse(string responseData)
        {
            return GetResponse(responseData, HttpStatusCode.BadRequest);
        }

        public static APIGatewayProxyResponse Get404Response(string responseData)
        {
            return GetResponse(responseData, HttpStatusCode.NotFound);
        }
    }
}
