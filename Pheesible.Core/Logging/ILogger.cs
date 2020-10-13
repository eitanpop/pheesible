using Amazon.Lambda.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pheesible.Core.Logging
{
    public interface ILogger
    {
        Task Log(string message, LogLevel logLevel = LogLevel.Info);
        Task Log(Exception ex, LogLevel logLevel = LogLevel.Info);
        void SetLambdaLogger(ILambdaLogger logger);
    }
}
