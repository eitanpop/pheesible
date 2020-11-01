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
            Function functions = new Function();


            var request = new APIGatewayProxyRequest();
            var context = new TestLambdaContext();
            var response = await functions.FunctionHandler(request, context);
            Assert.Equal(200, response.StatusCode);
            Assert.Equal("Hello AWS Serverless", response.Body);
        }
    }
}
