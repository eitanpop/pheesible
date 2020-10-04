using System.Threading.Tasks;
using Amazon.Lambda.CloudWatchEvents.ECSEvents;
using Pheesible.Promotions.EF;

namespace Pheesible.Scheduler.Jobs.Promotion
{
    public interface IPromotionPublisher
    {
        Task<bool> PublishToFaceBook(Promotions.EF.Promotions promotion, string landingPageLink, Facebook facebook);
       // Task<bool> PublishToInstagram(Promotions.EF.Promotions promotion, string landingPageLink, PromotionFocusGroup instagram);
     //   Task<bool> PublishToGoogle(Promotions.EF.Promotions promotion, string landingPageLink, PromotionFocusGroup google);
    }
}