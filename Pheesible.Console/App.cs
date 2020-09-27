using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pheesible.Console
{
    public class App : IApp
    {
        private readonly IConsoleConfig _config;
        public App(IConsoleConfig config)
        {
            _config = config;
        }
        public async Task Run()
        {
            System.Console.WriteLine(_config.Get("DbContextSettings:ConnectionString"));
        }
    }
}
