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

        public async Task Log(string message, LogLevel logLevel = LogLevel.Info)
        {
            if (logLevel == LogLevel.Error || logLevel == LogLevel.Critical)
            {
                try
                {
                    await _emailer.Send("", "", "Error", message);
                    if (logLevel == LogLevel.Critical)
                    {

                    }
                }
                catch (Exception ex)
                {
                    _lambdaLogger.Log($"Original Error: {message}, LoggingError: {ExplodeException(ex)}");
                }
            }
            _lambdaLogger.Log(message);
        }

        public async Task Log(Exception ex, LogLevel logLevel = LogLevel.Info)
        {
            await Log(ExplodeException(ex), logLevel);
        }

        public void SetLambdaLogger(ILambdaLogger lambdaLogger)
        {
            _lambdaLogger = lambdaLogger;
        }

        private string ExplodeException(Exception ex)
        {
            return ex.Message + " | " + ex.InnerException;
        }
    }
}
