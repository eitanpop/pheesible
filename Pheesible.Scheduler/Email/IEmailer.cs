using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Pheesible.Scheduler.Email
{
    public interface IEmailer
    {
        Task Send(string from, string to, string subject, string body);
    }
}
