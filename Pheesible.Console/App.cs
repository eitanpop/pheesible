using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions.EF;

namespace Pheesible.Console
{
    public class App : IApp
    {
        private readonly IConsoleConfig _config;
        private readonly PromotionContext _db;
        public App(IConsoleConfig config, PromotionContext db)
        {
            _config = config;
            _db = db;
        }
        public async Task Run()
        {
            var promotions = await _db.Promotions.ToListAsync();
            promotions.ForEach(x=>System.Console.WriteLine(x.Title));
        }
    }
}
