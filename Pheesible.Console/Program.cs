using System;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

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
            serviceCollection.AddTransient<IApp, App>();
        }
    }
}
