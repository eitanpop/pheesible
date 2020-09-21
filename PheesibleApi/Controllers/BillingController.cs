using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.InteropServices;
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
        [HttpGet("{amount}")]
        public async Task<string> Get(int amount)
        {
            var function = new Function();
            var result = await function.FunctionHandler(
                new APIGatewayProxyRequest { PathParameters = new Dictionary<string, string> { { "amount", amount.ToString() } } }, null);

            return result.Body;
        }
    }
}
