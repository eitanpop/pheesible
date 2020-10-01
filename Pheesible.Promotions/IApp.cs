using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;

namespace Pheesible.Promotions
{
    public interface IApp
    {
        Task<APIGatewayProxyResponse> Run(APIGatewayProxyRequest request);
    }
}
