using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using Amazon.Lambda.APIGatewayEvents;
using Microsoft.EntityFrameworkCore;
using Pheesible.Core;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions.Handlers.Admin
{
    public class ReviewHandler : IHandler
    {
        private readonly ILambdaConfiguration _config;

        public ReviewHandler(ILambdaConfiguration config)
        {
            _config = config;
        }
        public async Task<APIGatewayProxyResponse> Handle(APIGatewayProxyRequest request, PromotionContext db)
        {
            if (request.GetGroup() != _config.AdminGroup)
                return ApiGatewayHelper.GetForbiddenResponse("Forbidden!");
            string sub = request.GetSub();
            var promotions = await db.Promotions
                .Include(x => x.Facebook)
                .Include(x => x.Features)
                .Include(x => x.Ads)
                .Include(x => x.SellingPoints)
                .Include(x => x.Template)
                .Where(x => x.SubId == sub || x.StatusId == (int)PromotionStatus.ReadyForReview)
                .AsNoTracking()
                .ToListAsync();
            return ApiGatewayHelper.GetSuccessResponse(JsonSerializer.Serialize(promotions.Select(PromotionEntityToDtoConverter.Convert)));
        }
    }
}
