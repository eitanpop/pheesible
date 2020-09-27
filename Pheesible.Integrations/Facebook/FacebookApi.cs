﻿using System;
using System.IO;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Web;

namespace Pheesible.Integrations.Facebook
{
    public class FacebookApi
    {
        private readonly IFacebookConfig _config;
        public FacebookApi(IFacebookConfig config)
        {
            _config = config;
        }

        public async Task<HttpResponseMessage> CreateCampaign(string name, string status = "PAUSED")
        {
            using var httpClient = new HttpClient();
            using var request = new HttpRequestMessage(new HttpMethod("POST"), $"https://graph.facebook.com/v{_config.ApiVersion}/act_{_config.AdAccountId}/campaigns");
            var multipartContent = new MultipartFormDataContent();
            multipartContent.Add(new StringContent(name), "name");
            multipartContent.Add(new StringContent(_config.Objective), "objective");
            multipartContent.Add(new StringContent(status), "status");
            multipartContent.Add(new StringContent("[]"), "special_ad_categories");
            multipartContent.Add(new StringContent(_config.AccessToken), "access_token");
            request.Content = multipartContent;

            var response = await httpClient.SendAsync(request);
            return response;
        }


        public async Task<HttpResponseMessage> CreateAdSet(string name, int days, int budget, string campaignId, string status = "PAUSED")
        {
            using var httpClient = new HttpClient();
            using var request = new HttpRequestMessage(new HttpMethod("POST"), $"https://graph.facebook.com/v{_config.ApiVersion}/act_{_config.AdAccountId}/adsets");
            var multipartContent = new MultipartFormDataContent();
            multipartContent.Add(new StringContent(name), "name");
            multipartContent.Add(new StringContent(_config.OptimizationGoal), "optimization_goal");
            multipartContent.Add(new StringContent(_config.BillingEvent), "billing_event");
            multipartContent.Add(new StringContent("LOWEST_COST_WITHOUT_CAP"), "bid_strategy");
            multipartContent.Add(new StringContent(budget.ToString()), "daily_budget");
            multipartContent.Add(new StringContent(campaignId), "campaign_id");
            multipartContent.Add(new StringContent("{\"geo_locations\": {\"countries\":[\"US\"]}}"),"targeting");
            multipartContent.Add(new StringContent(DateTime.UtcNow.ToString("o")), "start_time");
            multipartContent.Add(new StringContent(DateTime.UtcNow.AddDays(days).ToString("o")), "end_time");
            multipartContent.Add(new StringContent(status), "status");
            multipartContent.Add(new StringContent(_config.AccessToken), "access_token");
            request.Content = multipartContent;

            var response = await httpClient.SendAsync(request);
            return response;
        }

        public async Task<HttpResponseMessage> CreateAdImageObject(byte[] image, string fileName)
        {
            using var httpClient = new HttpClient();
            using var request = new HttpRequestMessage(new HttpMethod("POST"), $"https://graph.facebook.com/v{_config.ApiVersion}/act_{_config.AdAccountId}/adimages");
            var multipartContent = new MultipartFormDataContent();
            multipartContent.Add(new ByteArrayContent(image), "filename", Path.GetFileName(fileName));
            multipartContent.Add(new StringContent(_config.AccessToken), "access_token");
            request.Content = multipartContent;

            var response = await httpClient.SendAsync(request);
            return response;
        }

        public async Task<HttpResponseMessage> CreateAdCreative(string name, AdCreative adCreative)
        {
            using var httpClient = new HttpClient();
            using var request = new HttpRequestMessage(new HttpMethod("POST"), $"https://graph.facebook.com/v{_config.ApiVersion}/act_{_config.AdAccountId}/adcreatives");
            var multipartContent = new MultipartFormDataContent();
            multipartContent.Add(new StringContent(name), "name");
            multipartContent.Add(new StringContent(JsonSerializer.Serialize(adCreative)), "object_story_spec");
            multipartContent.Add(new StringContent(_config.AccessToken), "access_token");
            request.Content = multipartContent;
            var response = await httpClient.SendAsync(request);
            return response;
        }

        public async Task<HttpResponseMessage> CreateAd(string name, string adSetId, string creativeId, string status="PAUSED")
        {
            using var httpClient = new HttpClient();
            using var request = new HttpRequestMessage(new HttpMethod("POST"), $"https://graph.facebook.com/v8.0/act_{_config.AdAccountId}/ads");
            var multipartContent = new MultipartFormDataContent();
            multipartContent.Add(new StringContent(name), "name");
            multipartContent.Add(new StringContent(adSetId), "adset_id");
            multipartContent.Add(new StringContent($"{{\"creative_id\": \"{creativeId}\"}}"), "creative");
            multipartContent.Add(new StringContent(status), "status");
            multipartContent.Add(new StringContent(_config.AccessToken), "access_token");
            request.Content = multipartContent;

            var response = await httpClient.SendAsync(request);
            return response;
        }

        public async Task<HttpResponseMessage> GetReportForAdSet(string adSetId, string[] fields)
        {
            using (var httpClient = new HttpClient())
            {
                using var request = new HttpRequestMessage(new HttpMethod("GET"), 
                    $"https://graph.facebook.com/v{_config.ApiVersion}/{adSetId}/insights?fields=" +
                    $"{HttpUtility.UrlEncode(String.Join(",", fields))}&access_token={_config.AccessToken}");
                var response = await httpClient.SendAsync(request);

                return response;
            }
        }
    }
}
