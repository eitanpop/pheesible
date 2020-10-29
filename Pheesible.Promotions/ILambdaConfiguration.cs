using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions
{
    public interface ILambdaConfiguration
    {
        string Get(string property);
        string ConnectionString { get; }
        string AdminGroup { get; }
        string AwsAccessKey { get; }
        string AwsSecret { get;  }

        T GetSection<T>(string name) where T :new ();
    }
}
