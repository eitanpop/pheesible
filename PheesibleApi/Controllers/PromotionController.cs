using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pheesible.Promotions;
using PheesibleApi.Models;

namespace PheesibleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PromotionController : ControllerBase
    {
        [HttpPost]
        public async Task<string> Post()
        {
            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { Body = body, HttpMethod = "Post"}, null);

            return result.Body;

        }

        [HttpGet]
        public async Task<string> Get()
        {

            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { HttpMethod = "get", Path = $"/promotion" }, null);

            return result.Body;
        }

        [HttpGet("{id}")]
        public async Task<string> Get(string id)
        {

            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { HttpMethod = "get", Path = $"/promotion/{id}", PathParameters = new Dictionary<string, string> { { "id", id } } }, null);

            return result.Body;
        }

        [HttpGet("templates")]
        public async Task<string> GetTemplates()
        {
            var function = new Function();
            var result =
                await function.FunctionHandler(new APIGatewayProxyRequest {HttpMethod = "get", Path = "/promotion/templates"}, null);
            return result.Body;
        }

        [HttpPost("lead")]
        public async Task<string> PostLead()
        {
            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { Body = body, HttpMethod = "Post", Path = "/promotion/lead" }, null);

            return result.Body;

        }


        private async Task<string> GetRequestContent()
        {
            using StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            return await reader.ReadToEndAsync();
        }
    }
}
