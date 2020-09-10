using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pheesible.Promotions
{
    public interface IApp
    {
        Task Run(string method, string body);
    }
}
