using System;
using System.Reflection;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Pheesible.Core.Email;

namespace Pheesible.Core.Logging
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

                    string body = await ResourceHelper.ReadResource("Pheesible.Scheduler.Email.Emails.ErrorLog.html", Assembly.GetExecutingAssembly());
                    body = body.Replace("{error}", message);
                    await _emailer.Send("", "", "Error or Critical Log Message", body);
                    if (logLevel == LogLevel.Critical)
                    {
                        //Todo: Add SMS sender
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
