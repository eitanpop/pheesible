using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions.DTO;
using Pheesible.Promotions.EF;
using Pheesible.Promotions.Handlers;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Pheesible.Promotions
{
    public class Function
    {
        private readonly IApp _app;
        private readonly ILambdaConfiguration _config;

        public Function(IApp app, ILambdaConfiguration config)
        {
            _app = app;
            _config = config;
        }

        public Function()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();
            _app = serviceProvider.GetService<IApp>();
            _config = serviceProvider.GetService<ILambdaConfiguration>();
        }

        private void ConfigureServices(IServiceCollection serviceCollection)
        {
            // add dependencies here
            serviceCollection.AddTransient<ILambdaConfiguration, LambdaConfiguration>();

            serviceCollection.AddTransient(provider =>
            {
                var connectionString = provider.GetService<ILambdaConfiguration>().ConnectionString;
                var options = new DbContextOptionsBuilder<PromotionContext>();
                options.UseNpgsql(connectionString, opt =>
                {
                    opt.EnableRetryOnFailure();
                });
                return new PromotionContext(options.Options);
            });
            serviceCollection.AddTransient<IApp, App>();
            serviceCollection.AddTransient<IHandlerFactory, HandlerFactory>();
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The API Gateway response.</returns>
        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            context.Logger.Log($"request: {JsonSerializer.Serialize(request)}");
            context.Logger.Log($"context: {JsonSerializer.Serialize(context)}");
            context.Logger.Log("SubId: " + request.RequestContext?.Authorizer?.Claims["sub"]);

            var response = await _app.Run(request);
            context.Logger.Log($"response: {JsonSerializer.Serialize(response)}");
            return response;
        }
    }
}
