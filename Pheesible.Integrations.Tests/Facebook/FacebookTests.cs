using Pheesible.Integrations.Facebook;
using System;
using System.IO;
using System.Threading.Tasks;
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
            var response = await api.CreateCampaign("Test Campaign");
            string content = await response.Content.ReadAsStringAsync();

            Console.WriteLine(content);
        }

        [Fact]
        public async Task CreateAdSet()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            var response = await api.CreateAdSet("Vivi Adset", 3, 5000, "23845686494730146");

            string content = await response.Content.ReadAsStringAsync();
            Console.WriteLine(content);
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
            string content = await response.Content.ReadAsStringAsync();

            Console.WriteLine(content);
        }

        [Fact]
        public async Task CreateAdCreative()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);

            string imageHash = "0a19d9d3156f0d1e79532c64703703e2";
            string link = "http://www.pheesible.com";
            string message = "This is the ad text from the API call";
            AdCreative creative = new AdCreative
            {
                page_id = config.PageId,
                link_data = new Link_Data
                {
                    image_hash = imageHash,
                    link = link,
                    message = message,
                    call_to_action = new Call_To_Action
                    {
                        type = "LEARN_MORE"
                   
                    }
                }
            };

            var response = await api.CreateAdCreative("Test Creative", creative);
            string content = await response.Content.ReadAsStringAsync();

            Console.WriteLine(content);
        }

        [Fact]
        public async Task CreateAd()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            string adSetId = "23845686498240146";
            string creativeId = "23845686860340146";
            var response = await api.CreateAd("Test AD", adSetId, creativeId);
            string content = await response.Content.ReadAsStringAsync();
            Console.WriteLine(content);
        }

        [Fact]
        public async Task GetAdStatistics()
        {
            var config = new FacebookConfigTestObject();
            var api = new FacebookApi(config);
            string adSetId = "";
            var response = await api.GetReportForAdSet(adSetId, new string[] { "breakdowns" });
            string content = await response.Content.ReadAsStringAsync();
            Console.WriteLine(content);

        }
    }
}
