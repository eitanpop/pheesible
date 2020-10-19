using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;


namespace Pheesible.Promotions
{
    public class LambdaConfiguration : ILambdaConfiguration
    {
        public IConfigurationRoot Configuration => new ConfigurationBuilder()
           .SetBasePath(Directory.GetCurrentDirectory())
           .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
           .AddEnvironmentVariables()
           .Build();        

        public string Get(string property) =>
            Configuration[property];

        public string ConnectionString => Get("DbContextSettings:ConnectionString");
        public string AdminGroup => Get("AdminGroup");

        public T GetSection<T>(string name) where T : new()
        {
            T section = new T();
            Configuration.GetSection(name).Bind(section);
            return section;
        }
    }
}
