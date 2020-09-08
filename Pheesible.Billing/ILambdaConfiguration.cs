using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Billing
{
    public interface ILambdaConfiguration
    {
        string Get(string property);

        public string StripeSecret { get; }
    }
}
