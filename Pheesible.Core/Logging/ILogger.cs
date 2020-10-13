using Amazon.Lambda.Core;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pheesible.Core.Logging
{
    public interface ILogger
    {
        Task Log(LogLevel logLevel, string message);
        Task Log(LogLevel logLevel, Exception ex);
        void SetLambdaLogger(ILambdaLogger logger);
    }
}
