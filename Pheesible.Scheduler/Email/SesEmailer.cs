using Amazon.SimpleEmail;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Amazon.SimpleEmail.Model;
using Pheesible.Core.Email;

namespace Pheesible.Scheduler.Email
{
    public class SesEmailer : IEmailer
    {
        private readonly IAmazonSimpleEmailService _service;

        public SesEmailer(IAmazonSimpleEmailService service)
        {
            _service = service;
        }

        public async Task Send(string @from, List<string> to, string subject, string body)
        {
            await _service.SendEmailAsync(new SendEmailRequest
            {
                Source = @from,
                Destination = new Destination
                {
                    ToAddresses = to
                },
                Message = new Message
                {
                    Subject = new Content(subject),
                    Body = new Body
                    {
                        Html = new Content
                        {
                            Charset = "UTF-8",
                            Data = body
                        },
                        Text = new Content
                        {
                            Charset = "UTF-8",
                            Data = body
                        }
                    }
                }
            });
        }
    }
}
