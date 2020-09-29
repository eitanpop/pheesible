using System;
using System.Collections.Generic;
using System.IO;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;
using Amazon.S3;
using Amazon.S3.Model;

namespace Pheesible.Integrations.AWS
{
    public class S3 : IS3
    {
        public async Task<byte[]> GetObject(string bucketName, string key)
        {
            var s3 = new AmazonS3Client();

            GetObjectRequest request = new GetObjectRequest
            {
                BucketName = bucketName,
                Key = key
            };
            using GetObjectResponse response = await s3.GetObjectAsync(request);
            await using var memoryStream = new MemoryStream();
            response.ResponseStream.CopyTo(memoryStream);
            return memoryStream.ToArray();
        }
    }
}
