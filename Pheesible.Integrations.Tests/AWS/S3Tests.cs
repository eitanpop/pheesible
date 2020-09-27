using Pheesible.Integrations.AWS;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace Pheesible.Integrations.Tests.AWS
{
    public class S3Tests
    {
        [Fact]
        public async Task GetS3Item()
        {
            S3 s3 = new S3();
            byte[] byteArr = await s3.GetObject("protected/us-east-1:a0789da5-d0ae-4689-af4f-6356b95d689a/1/ad/Okta.png");
            Console.WriteLine("works");
        }
    }
}
