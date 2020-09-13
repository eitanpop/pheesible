using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers
{
    public interface IHandler
    {
        public Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db);
    }
}
