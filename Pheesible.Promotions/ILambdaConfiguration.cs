using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions
{
    public interface ILambdaConfiguration
    {
        string Get(string property);
        string ConnectionString { get; }
    }
}
