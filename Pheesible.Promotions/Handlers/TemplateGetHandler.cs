using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers
{
    public class TemplateGetHandler : IHandler
    {
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            var templates = await db.Templates.ToListAsync();
            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(templates.Select(x => new { x.Id, x.Name })));
        }
    }
}
