using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;
using Microsoft.Extensions.Configuration;
using Moq;
using Pheesible.Billing;

namespace Pheesible.Billing.Tests
{
    public class FunctionTest
    {
        [Fact]
        public void Function_Should_Return_Config_Variable()
        {
          // Mock IConfiguration
          string configValue = "asdf";
            var expected = "ENV1|ASDF";
            var mockConfig = new Mock<ILambdaConfiguration>();
            mockConfig.Setup(p => p.Get(It.IsAny<string>())).Returns(configValue);

            // Invoke the lambda function and confirm config value is returned
            var function = new Function(mockConfig.Object);
            var result = function.FunctionHandler("env1", null);
            Assert.Equal(expected, result);
        }
    }
}
