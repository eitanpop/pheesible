using Pheesible.Integrations.Facebook;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Pheesible.Integrations.Facebook.Models;
using Xunit;

namespace Pheesible.Integrations.Tests
{
    public class FacebookTests
    {
        [Fact]
        public async Task CreateCampaign()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            var response = await api.CreateCampaign("Pheesible Test Campaign");
            Console.WriteLine(response.id);
        }

        [Fact]
        public async Task CreateAdSet()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            string campaignId = "23845688148570146";
            var response = await api.CreateAdSet("Vivi Adset", 3, 5000);
            Console.WriteLine(response.id);
        }

        [Fact]
        public async Task CreateAdImageObject()
        {
            string filePath = @"C:\Users\oysta\Pictures\TestImage.png";
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            var bytes = File.ReadAllBytes(filePath);
            string fileName = Path.GetFileName(filePath);
            var response = await api.CreateAdImageObject(bytes, fileName);

            Console.WriteLine(response.hash);
        }

        [Fact]
        public async Task CreateAdCreative()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            var image = new Image()
            {
                hash = "93991e897f8f220c7f8b1b8f120954d6"
            };
            string link = "http://www.pheesible.com";
            string message = "This is the ad text from the API call";

            var response = await api.CreateAdCreative("Test Creative", image, link, message);

            Console.WriteLine(response.id);
        }

        [Fact]
        public async Task CreateAd()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            string adSetId = "23845688150210146";
            string creativeId = "23845688154920146";
            var response = await api.CreateAd("Test AD", adSetId, creativeId);
            Console.WriteLine(response.id);
        }

        [Fact]
        public async Task GetAdStatistics()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            string adSetId = "23845686498240146";
            var response = await api.GetReportForAdSet(adSetId, new string[] { "actions", "clicks", "date_start", "date_stop", "impressions" });
            var content = response?.data?.FirstOrDefault();
            Console.WriteLine(content);

        }
    }
}
