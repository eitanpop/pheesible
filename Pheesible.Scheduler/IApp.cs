using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.CloudWatchEvents.ScheduledEvents;
using Amazon.Lambda.Core;
using Pheesible.Core.Logging;

namespace Pheesible.Scheduler
{
    public interface IApp
    {
        Task Run(ScheduledEvent request, ILogger logger);
    }
}
