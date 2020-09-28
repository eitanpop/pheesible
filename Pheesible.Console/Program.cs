using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Pheesible.Promotions.EF;

namespace Pheesible.Console
{
    class Program
    {
        private static string[] _args;
        private static IApp _app;
        public static async Task Main(string[] args)
        {
            _args = args;
            var services = new ServiceCollection();
            ConfigureServices(services);
            var serviceProvider = services.BuildServiceProvider();
            _app = serviceProvider.GetService<IApp>();
            await _app.Run();
        }

        static void ConfigureServices(IServiceCollection serviceCollection)
        {
            serviceCollection.AddTransient<IConsoleConfig>(x => new ConsoleConfig(_args));

            serviceCollection.AddDbContext<PromotionContext>((serviceProvider, options) =>
            {
                var connectionString = serviceProvider.GetService<IConsoleConfig>().ConnectionString;
                options.UseNpgsql(connectionString, opt => opt.EnableRetryOnFailure());
            });
            serviceCollection.AddTransient<PromotionContext>();
            serviceCollection.AddTransient<IApp, App>();
        }
    }
}
