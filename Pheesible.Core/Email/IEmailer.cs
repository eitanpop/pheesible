using System.Collections.Generic;
using System.Threading.Tasks;

namespace Pheesible.Core.Email
{
    public interface IEmailer
    {
        Task Send(string from, List<string> to, string subject, string body);
    }
}
