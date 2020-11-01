using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.TestUtilities;
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
        private const string TEST_SUB = "214a3413-b85b-420f-9be1-36a620db934e";
        [HttpPost]
        public async Task<string> Post()
        {
            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { Body = body, HttpMethod = "Post", Path = "/promotion" }, null);

            return result.Body;

        }

        [HttpGet]
        public async Task<string> Get()
        {

            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest
            {
                HttpMethod = "get",
                Path = "/promotion",
                RequestContext = GetRequestContext()
            }, new TestLambdaContext());


            return result.Body;
        }

        [HttpGet("{id}")]
        public async Task<string> Get(string id)
        {

            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { HttpMethod = "get", Path = $"/promotion/{id}", PathParameters = new Dictionary<string, string> { { "id", id } } }, new TestLambdaContext());

            return result.Body;
        }

        [HttpGet("templates")]
        public async Task<string> GetTemplates()
        {
            var function = new Function();
            var result =
                await function.FunctionHandler(new APIGatewayProxyRequest { HttpMethod = "get", Path = "/promotion/templates" }, null);
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


        [HttpGet("report/{id}")]
        public async Task<string> GetReport(string id)
        {
            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { Body = body, HttpMethod = "Get", Path = $"/promotion/report/{id}", PathParameters = new Dictionary<string, string> { { "id", id } }, RequestContext = GetRequestContext()}, new TestLambdaContext());

            return result.Body;
        }


        [HttpGet("public/{id}")]
        public async Task<string> GetPublic(string id)
        {
            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { Body = body, HttpMethod = "Get", Path = $"/promotion/public/{id}", PathParameters = new Dictionary<string, string> { { "id", id } } }, null);

            return result.Body;
        }

        [HttpPost("stripe")]
        public async Task<string> PostStripe()
        {
            var body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(new APIGatewayProxyRequest { Body = body, HttpMethod = "Post", Path = $"/promotion/stripe" }, null);
            return result.Body;
        }


        private async Task<string> GetRequestContent()
        {
            using StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            return await reader.ReadToEndAsync();
        }

        private APIGatewayProxyRequest.ProxyRequestContext GetRequestContext()
        {
            return new APIGatewayProxyRequest.ProxyRequestContext
            {
                Authorizer = new APIGatewayCustomAuthorizerContext
                {
                    Claims = new Dictionary<string, string> {{"sub", TEST_SUB}}
                }
            };
        }
    }
}
