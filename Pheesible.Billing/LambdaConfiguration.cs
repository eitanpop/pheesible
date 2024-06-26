﻿using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Pheesible.Billing
{
    public class LambdaConfiguration : ILambdaConfiguration
    {
        public IConfigurationRoot Configuration => new ConfigurationBuilder()
             .SetBasePath(Directory.GetCurrentDirectory())
             .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
             .AddEnvironmentVariables()
             .Build();

        public string StripeSecret => Get("stripe_key");

        public string Get(string property) =>
            Configuration[property];

    }
}
