using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Runtime.InteropServices;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Pheesible.Billing;

namespace PheesibleApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BillingController : ControllerBase
    {
        [HttpPost]
        public async Task<string> Post()
        {
            string body = await GetRequestContent();
            var function = new Function();
            var result = await function.FunctionHandler(
                new APIGatewayProxyRequest { Body = body }, null);

            return result.Body;
        }

        private async Task<string> GetRequestContent()
        {
            using StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8);
            return await reader.ReadToEndAsync();
        }
    }
}
