using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Microsoft.Extensions.Configuration;

namespace Pheesible.Scheduler
{
    public class LambdaConfiguration : ILambdaConfiguration
    {
        public IConfigurationRoot Configuration => new ConfigurationBuilder()
            .SetBasePath(Directory.GetCurrentDirectory())
            .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
            .AddEnvironmentVariables()
            .Build();

        public string ConnectionString => Get("DbContextSettings:ConnectionString");
        public string LandingPageLink => Get("LandingPageLink");
        public string BucketName => Get("AWS:BucketName");
        public string AwsAccessKey => Get("AWS:AccessKey");
        public string AwsSecret => Get("AWS:Secret");
        public string AwsRegion => Get("AWS:Region");
        public string UserPoolId => Get("AWS:UserPoolId");
        public string Get(string property) =>
            Configuration[property];
    }
}
