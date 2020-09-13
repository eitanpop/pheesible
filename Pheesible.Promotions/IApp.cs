using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;

namespace Pheesible.Promotions
{
    public interface IApp
    {
        Task<APIGatewayProxyResponse> Run(APIGatewayProxyRequest request);
    }
}
