using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;
using Amazon.Lambda.APIGatewayEvents;

using Pheesible.Promotions;

namespace Pheesible.Promotions.Tests
{
    public class FunctionTest
    {
        public FunctionTest()
        {
        }

        [Fact]
        public async Task TetGetMethod()
        {
            TestLambdaContext context;
            APIGatewayProxyRequest request;
            APIGatewayProxyResponse response;
            Function functions = new Function();


            request = new APIGatewayProxyRequest();
            context = new TestLambdaContext();
            response = await functions.FunctionHandler(request, context);
            Assert.Equal(200, response.StatusCode);
            Assert.Equal("Hello AWS Serverless", response.Body);
        }
    }
}
