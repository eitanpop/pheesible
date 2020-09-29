using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;
using System.Threading.Tasks;

using Amazon.Lambda.Core;
using Amazon.Lambda.CloudWatchEvents;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Pheesible.Integrations.AWS;
using Pheesible.Integrations.Facebook;
using Pheesible.Promotions.EF;
using Pheesible.Scheduler.Jobs;
using Pheesible.Scheduler.Jobs.Promotion;

// Assembly attribute to enable the Lambda function's JSON input to be converted into a .NET class.
[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace Pheesible.Scheduler
{
    public class Function
    {
        private readonly IApp _app;
        /// <summary>
        /// Default constructor that Lambda will invoke.
        /// </summary>
        public Function(IApp app)
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
            serviceCollection.AddTransient<IFacebookApi, FacebookApi>();
            serviceCollection.AddTransient<IPromotionPublisher, PromotionPublisher>();
            serviceCollection.AddTransient<PromotionJob>();
            serviceCollection.AddTransient<IFacebookConfig, FacebookConfig>();
            serviceCollection.AddTransient<IS3, S3>();
            serviceCollection.AddTransient((x) =>
            {
                var jobQueue = new Queue<IJob>();
                jobQueue.Enqueue(x.GetService<PromotionJob>());
                return jobQueue;
            });
        }


        /// <summary>
        /// A Lambda function to respond to HTTP Get methods from API Gateway
        /// </summary>
        /// <param name="request"></param>
        /// <returns>The API Gateway response.</returns>
        public async Task FunctionHandler(Amazon.Lambda.CloudWatchEvents.ScheduledEvents.ScheduledEvent request, ILambdaContext context)
        {
            context.Logger.LogLine("request: " + JsonSerializer.Serialize(request));
            await _app.Run(request, context.Logger);
            context.Logger.Log("Done running jobs");
        }
    }
}
