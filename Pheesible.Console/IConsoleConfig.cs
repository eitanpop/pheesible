using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Console
{
    public interface IConsoleConfig
    {
        string Get(string property);
        string ConnectionString { get; }
    }
}
