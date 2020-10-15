using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.CloudWatchEvents.ScheduledEvents;
using Amazon.Lambda.Core;
using Pheesible.Core.Logging;
using Pheesible.Promotions.EF;
using Pheesible.Scheduler.Jobs;

namespace Pheesible.Scheduler
{
    public class App : IApp
    {
        private readonly Queue<IJob> _jobQueue;
        private readonly PromotionContext _db;
        public App(Queue<IJob> jobs, PromotionContext db)
        {
            _jobQueue = jobs;
            _db = db;
        }

        public async Task Run(ScheduledEvent request, ILogger logger)
        {
            foreach (var job in _jobQueue)
            {
                var response = await job.Run(_db);
                await logger.Log(JsonSerializer.Serialize(response));
            }
        }
    }
}
