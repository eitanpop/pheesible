using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Pheesible.Promotions.EF;

namespace Pheesible.Promotions
{
    public class App : IApp
    {
        private ILambdaConfiguration _config;
        private PromotionContext _db;
        public App(ILambdaConfiguration configuration, PromotionContext context)
        {
            _config = configuration;
            _db = context;
        }

        public async Task Run(string method)
        {
            _db.Promotions.Add(new EF.Promotions { Id = 133, SubId = "1231!#@3123123" });
            await _db.SaveChangesAsync();
        }
    }
}
