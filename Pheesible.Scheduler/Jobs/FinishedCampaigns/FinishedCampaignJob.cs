using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Amazon.CognitoIdentityProvider;
using Amazon.CognitoIdentityProvider.Model;
using Microsoft.EntityFrameworkCore;
using Pheesible.Promotions;
using Pheesible.Promotions.EF;

namespace Pheesible.Scheduler.Jobs
{
    public class FinishedCampaignJob : IJob
    {
        private readonly AmazonCognitoIdentityProviderClient _client;
        private readonly ILambdaConfiguration _config;

        public FinishedCampaignJob(AmazonCognitoIdentityProviderClient client, ILambdaConfiguration config)
        {
            _client = client;
            _config = config;
        }
        public async Task<JobResponse> Run(PromotionContext db)
        {
            var jobResponse = new JobResponse { StartTime = DateTime.UtcNow, JobName = "FinishedCampaignJob" };
            var promotions = await db.Promotions.Where(x => x.StatusId == (int)PromotionStatus.Running &&
                                                            x.Facebook.Any(y => x.CreateDate.Value.AddDays(y.NumberOfDays) >= DateTime.UtcNow)).ToListAsync();

            if (!promotions.Any())
            {
                jobResponse.IsSuccess = true;
                jobResponse.EndTime = DateTime.UtcNow;
                return jobResponse;
            }


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
            }

            return jobResponse;
        }
    }
}
