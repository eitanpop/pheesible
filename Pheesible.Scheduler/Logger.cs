using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Pheesible.Core.Logging;
using Pheesible.Scheduler.Email;

namespace Pheesible.Scheduler
{
    public class Logger : ILogger
    {
        private ILambdaLogger _lambdaLogger;
        private readonly IEmailer _emailer;

        public Logger(IEmailer emailer)
        {
            _emailer = emailer;
        }

        public async Task Log(LogLevel logLevel, string message)
        {
            if (logLevel == LogLevel.Error || logLevel == LogLevel.Critical)
            {
                await _emailer.Send("", "", "Error", message);
            }
        }

        public async Task Log(LogLevel logLevel, Exception ex)
        {
            await Log(logLevel, ex.Message);
        }

        public void SetLambdaLogger(ILambdaLogger lambdaLogger)
        {
            _lambdaLogger = lambdaLogger;
        }
    }
}
