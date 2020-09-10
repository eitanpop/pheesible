using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions.EF;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Pheesible.Promotions
{
    public class Function
    {
        private readonly IApp _app;

        public Function(App app)
        {
            _app = app;
        }

        public Function()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();
            _app = serviceProvider.GetService<IApp>();
        }

        private void ConfigureServices(IServiceCollection serviceCollection)
        {
            // add dependencies here
            serviceCollection.AddTransient<ILambdaConfiguration, LambdaConfiguration>();

            serviceCollection.AddDbContext<PromotionContext>((serviceProvider, options) =>
            {
                var connectionString = serviceProvider.GetService<ILambdaConfiguration>().ConnectionString;
                options.UseNpgsql(connectionString, opt => opt.EnableRetryOnFailure());
            });
            serviceCollection.AddTransient<IApp, App>();
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The API Gateway response.</returns>
        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            await _app.Run(request.HttpMethod, request.Body);

            var response = new APIGatewayProxyResponse
            {
                StatusCode = (int)HttpStatusCode.OK,
                Body = "",
                Headers = new Dictionary<string, string>
                {
                    { "Content-Type", "application/json" },
                    { "Access-Control-Allow-Origin", "*" }
                }
            };

            return response;
        }
    }
}
