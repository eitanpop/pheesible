using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.CloudWatchEvents.ECSEvents;
using Pheesible.Promotions.EF;

namespace Pheesible.Scheduler.Jobs
{
    public interface IJob
    {
        Task<JobResponse> Run(PromotionContext db);
    }
}
