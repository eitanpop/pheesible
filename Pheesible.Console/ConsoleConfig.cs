using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Pheesible.Console
{
    public class ConsoleConfig : IConsoleConfig
    {
        private readonly IConfiguration _configuration;
        public ConsoleConfig(string[] args)
        {
            _configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                .AddEnvironmentVariables()
                .AddCommandLine(args)
                .Build();

        }

        public string Get(string property) =>
            _configuration[property];

        public string ConnectionString => Get("DbContextSettings:ConnectionString");
    }
}
