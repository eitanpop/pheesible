using Amazon.Lambda.Core;
using Pheesible.Core.Email;
using Pheesible.Core.Logging;
using System;
using System.Collections.Generic;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

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

        //TODO: inject settings variable to send to distribution list. It's bad to hardcode but Im lazy right now
        public async Task Log(string message, LogLevel logLevel = LogLevel.Info)
        {
            if (logLevel == LogLevel.Error || logLevel == LogLevel.Critical)
            {
                try
                {

                    string body = await ResourceHelper.ReadResource("Pheesible.Core.Email.ErrorLog.html", Assembly.GetExecutingAssembly());
                    body = body.Replace("{error}", message);
                    await _emailer.Send("info@pheesible.com", "eitanpop@gmail.com", "Error or Critical Log Message", body);
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
            return ex.Message + " | " + ex.InnerException + "|" + ex.Source + "|" + ex.StackTrace;
        }
    }
}

