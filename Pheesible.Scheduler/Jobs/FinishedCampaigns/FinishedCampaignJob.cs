using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Microsoft.EntityFrameworkCore;
using Pheesible.Core;
using Pheesible.Core.Email;
using Pheesible.Promotions;
using Pheesible.Promotions.EF;


namespace Pheesible.Scheduler.Jobs
{
    public class FinishedCampaignJob : IJob
    {
        private readonly AmazonCognitoIdentityProviderClient _client;
        private readonly ILambdaConfiguration _config;
        private readonly IEmailer _emailer;

        public FinishedCampaignJob(AmazonCognitoIdentityProviderClient client, ILambdaConfiguration config, IEmailer emailer)
        {
            _client = client;
            _config = config;
            _emailer = emailer;
        }
        public async Task<JobResponse> Run(PromotionContext db)
        {
            var jobResponse = new JobResponse { StartTime = DateTime.UtcNow, JobName = "FinishedCampaignJob" };
            var promotions = await db.Promotions.Include(x=>x.Facebook).Where(x => x.StatusId == (int)PromotionStatus.Running).ToListAsync();
            promotions = promotions.Where(x =>
                x.CreateDate != null && 
                x.Facebook.FirstOrDefault() != null && 
                x.CreateDate.Value.AddDays(x.Facebook.FirstOrDefault().NumberOfDays) <= DateTime.UtcNow).ToList();

            if (!promotions.Any())
            {
                jobResponse.IsSuccess = true;
                jobResponse.EndTime = DateTime.UtcNow;
                return jobResponse;
            }

            string campaignFinishEmailBody = await ResourceHelper
                .ReadResource("Pheesible.Scheduler.Email.Emails.CampaignFinishNotification.html", Assembly.GetExecutingAssembly());

            foreach (var promotion in promotions)
            {
                promotion.StatusId = (int)PromotionStatus.Done;
                await db.SaveChangesAsync();
                var user = await _client.AdminGetUserAsync(new AdminGetUserRequest
                {
                    UserPoolId = _config.UserPoolId,
                    Username = promotion.SubId
                });

                string email = user.UserAttributes.FirstOrDefault(x => x.Name == "email")?.Value;

                await _emailer.Send(_config.AdminEmail, email, $"Campaign \"{promotion.Name}\" finished.", 
                    campaignFinishEmailBody.Replace("{name}", promotion.Name));
            }

            return jobResponse;
        }
    }
}
