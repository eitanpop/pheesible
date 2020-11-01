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
using Pheesible.Integrations.Facebook;
using Pheesible.Core.Email;
using Pheesible.Promotions.Email;
using Pheesible.Core.Logging;
using Amazon.Runtime;
using Amazon.Extensions.NETCore.Setup;
using Amazon.SimpleEmail;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Pheesible.Promotions
{
    public class Function
    {
        private readonly IApp _app;
        private readonly ILambdaConfiguration _config;
        private readonly ILogger _logger;

        public Function(IApp app, ILambdaConfiguration config, ILogger logger)
        {
            _app = app;
            _config = config;
            _logger = logger;
        }

        public Function()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();
            _app = serviceProvider.GetService<IApp>();
            _config = serviceProvider.GetService<ILambdaConfiguration>();
            _logger = serviceProvider.GetService<ILogger>();
        }

        private void ConfigureServices(IServiceCollection serviceCollection)
        {
            // add dependencies here
            serviceCollection.AddTransient<ILambdaConfiguration, LambdaConfiguration>();

            serviceCollection.AddScoped(provider =>
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
            serviceCollection.AddTransient<IFacebookConfig>(x => x.GetService<ILambdaConfiguration>().GetSection<FacebookConfig>("Facebook"));

            var config = serviceCollection.BuildServiceProvider().GetService<ILambdaConfiguration>();

            var credentials = new BasicAWSCredentials(config.AwsAccessKey, config.AwsSecret);
            serviceCollection.AddDefaultAWSOptions(new AWSOptions
            {
                Credentials = credentials
            });
            serviceCollection.AddAWSService<IAmazonSimpleEmailService>();
            serviceCollection.AddTransient<IFacebookApi, FacebookApi>();
            serviceCollection.AddTransient<IHandlerFactory, HandlerFactory>();
            serviceCollection.AddTransient<IEmailer, SesEmailer>();
            serviceCollection.AddTransient<ILogger, Logger>();
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The API Gateway response.</returns>
        public async Task<APIGatewayProxyResponse> FunctionHandler(APIGatewayProxyRequest request, ILambdaContext context)
        {
            try
            {
                _logger.SetLambdaLogger(context.Logger);
                await _logger.Log($"request: {JsonSerializer.Serialize(request)}");
                await _logger.Log($"context: {JsonSerializer.Serialize(context)}");
                await _logger.Log("SubId: " + request.RequestContext?.Authorizer?.Claims["sub"]);

                var response = await _app.Run(request);
                context.Logger.Log($"response: {JsonSerializer.Serialize(response)}");           
                return response;
            }
            catch (Exception ex)
            {
                await _logger.Log(ex, LogLevel.Error);
                return ApiGatewayHelper.GetErrorResponse("Error facilitating request");
            }
        }
    }
}
