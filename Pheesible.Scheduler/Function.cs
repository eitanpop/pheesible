using System;
using Amazon.CognitoIdentityProvider;
using Amazon.Extensions.NETCore.Setup;
using Amazon.Lambda.Core;
using Amazon.Runtime;
using Amazon.SimpleEmail;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pheesible.Integrations.AWS;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions.EF;
using Pheesible.Scheduler.Email;
using Pheesible.Scheduler.Jobs;
using Pheesible.Scheduler.Jobs.Promotion;
using System.Collections.Generic;
using System.Text.Json;
using System.Threading.Tasks;
using Pheesible.Core.Email;
using Pheesible.Core.Logging;


// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Pheesible.Scheduler
{
    public class Function
    {
        private readonly IApp _app;
        private readonly ILogger _logger;
        /// <summary>
        /// Default constructor that Lambda will invoke.
        /// </summary>
        public Function(IApp app, ILogger logger)
        {
            _app = app;
            _logger = logger;
        }
        public Function()
        {
            var serviceCollection = new ServiceCollection();
            ConfigureServices(serviceCollection);
            var serviceProvider = serviceCollection.BuildServiceProvider();
            _app = serviceProvider.GetService<IApp>();
            _logger = serviceProvider.GetService<ILogger>();
        }

        private void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<ILambdaConfiguration, LambdaConfiguration>();
            serviceCollection.AddDbContext<PromotionContext>((serviceProvider, options) =>
            {
                var connectionString = serviceProvider.GetService<ILambdaConfiguration>().ConnectionString;
                options.UseNpgsql(connectionString, opt => opt.EnableRetryOnFailure());
            });
            serviceCollection.AddTransient<IApp, App>();
            serviceCollection.AddTransient<IFacebookApi, FacebookApi>();
            serviceCollection.AddTransient<IPromotionPublisher, PromotionPublisher>();
            serviceCollection.AddTransient<PromotionJob>();
            serviceCollection.AddTransient<FinishedCampaignJob>();
            serviceCollection.AddTransient<IFacebookConfig>(x=>
            {
                return x.GetService<ILambdaConfiguration>().GetSection<FacebookConfig>("Facebook");
            });
            serviceCollection.AddTransient<IS3, S3>();

            var config = serviceCollection.BuildServiceProvider().GetService<ILambdaConfiguration>();
            var credentials = new BasicAWSCredentials(config.AwsAccessKey, config.AwsSecret);
            serviceCollection.AddDefaultAWSOptions(new AWSOptions
            {
                Credentials = credentials
            });

            serviceCollection.AddTransient(x =>
                new AmazonCognitoIdentityProviderClient(credentials, new AmazonCognitoIdentityProviderConfig { AuthenticationRegion = config.AwsRegion }));


            serviceCollection.AddTransient((x) =>
                {
                    var jobQueue = new Queue<IJob>();
                    jobQueue.Enqueue(x.GetService<PromotionJob>());
                    jobQueue.Enqueue(x.GetService<FinishedCampaignJob>());
                    return jobQueue;
                });

            serviceCollection.AddAWSService<IAmazonSimpleEmailService>();
            serviceCollection.AddTransient<IEmailer, SesEmailer>();
            serviceCollection.AddTransient<ILogger, Logger>();
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The API Gateway response.</returns>
        public async Task FunctionHandler(Amazon.Lambda.CloudWatchEvents.ScheduledEvents.ScheduledEvent request, ILambdaContext context)
        {
            try
            {
                _logger.SetLambdaLogger(context.Logger);
                await _logger.Log($"request: {JsonSerializer.Serialize(request)}");
                await _app.Run(request, _logger);
                await _logger.Log("Done running jobs");
            }
            catch (Exception ex)
            {
                await _logger.Log(ex, LogLevel.Error);
            }
        }
    }
}
