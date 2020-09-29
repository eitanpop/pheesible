using System.Threading.Tasks;
using Amazon.Lambda.CloudWatchEvents.ECSEvents;
using Pheesible.Promotions.EF;

namespace Pheesible.Scheduler.Jobs.Promotion
{
    public interface IPromotionPublisher
    {
        Task<bool> PublishToFaceBook(string name, string landingPageLink, Ads ad, PromotionFocusGroup facebook);
        Task<bool> PublishToInstagram(string name, string landingPageLink, Ads ad, PromotionFocusGroup instagram);
        Task<bool> PublishToGoogle(string name, string landingPageLink, Ads ad, PromotionFocusGroup google);
    }
}