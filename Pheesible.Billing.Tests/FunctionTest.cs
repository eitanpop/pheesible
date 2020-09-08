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
using Pheesible.Billing.BillingProviders;

namespace Pheesible.Billing.Tests
{
    public class FunctionTest
    {
        [Fact]
        public void Function_Should_Return_Config_Variable()
        {
            var expected = new BillingResponse(BillingStatus.Success, "test message");
            var mockConfig = new Mock<IBillingProvider>();
            mockConfig.Setup(p => p.Bill(It.IsAny<int>())).Returns(expected);

            // Invoke the lambda function and confirm config value is returned
            var function = new Function(mockConfig.Object);
            var result = function.FunctionHandler(123, null);
            Assert.Equal(expected.Message, result);
        }
    }
}
