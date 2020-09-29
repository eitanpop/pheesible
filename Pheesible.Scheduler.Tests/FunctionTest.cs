using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.CloudWatchEvents.ScheduledEvents;
using Pheesible.Scheduler;

namespace Pheesible.Scheduler.Tests
{
    public class FunctionTest
    {
        public FunctionTest()
        {
        }

        [Fact]
        public async Task TetGetMethod()
        {
            Function function = new Function();
            var request = new ScheduledEvent();
            var context = new TestLambdaContext();

            await function.FunctionHandler(request, context);
        }
    }
}
