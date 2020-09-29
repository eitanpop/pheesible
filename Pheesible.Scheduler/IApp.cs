using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.CloudWatchEvents.ScheduledEvents;
using Amazon.Lambda.Core;

namespace Pheesible.Scheduler
{
    public interface IApp
    {
        Task Run(ScheduledEvent request, ILambdaLogger logger);
    }
}
