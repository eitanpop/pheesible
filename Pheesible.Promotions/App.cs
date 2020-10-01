using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Amazon.Lambda.Core;
using Pheesible.Promotions.EF;
using Pheesible.Promotions.Handlers;

namespace Pheesible.Promotions
{
    public class App : IApp
    {
        private ILambdaConfiguration _config;
        private readonly PromotionContext _db;
        private readonly IHandlerFactory _handlerFactory;
        public App(ILambdaConfiguration configuration, PromotionContext context, IHandlerFactory handlerFactory)
        {
            _config = configuration;
            _db = context;
            _handlerFactory = handlerFactory;
        }

        public async Task<APIGatewayProxyResponse> Run(APIGatewayProxyRequest request)
        {
            var handler = _handlerFactory.Get(request);
            var response = await handler.Handle(request, _db);
            return response;
        }
    }
}
