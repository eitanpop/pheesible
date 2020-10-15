using System.Threading.Tasks;

namespace Pheesible.Core.Email
{
    public interface IEmailer
    {
        Task Send(string from, string to, string subject, string body);
    }
}
