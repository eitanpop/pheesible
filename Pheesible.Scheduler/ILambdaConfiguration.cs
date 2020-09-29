using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Scheduler
{
    public interface ILambdaConfiguration
    {
        string ConnectionString { get; }

        string LandingPageLink { get; }

        string Get(string property);
    }
}
