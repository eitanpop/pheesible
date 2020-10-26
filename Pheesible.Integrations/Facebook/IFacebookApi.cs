using System.Threading.Tasks;
using Pheesible.Integrations.Facebook.Models;

namespace Pheesible.Integrations.Facebook
{
    public interface IFacebookApi
    {
        Task<Id> CreateCampaign(string name, string status = "PAUSED");
        Task<Id> CreateAdSet(string name, int days, int budget, bool includeInstagram, string status = "PAUSED");
        Task<Image> CreateAdImageObject(byte[] image, string fileName);
        Task<Id> CreateAdCreative(string name, Image image, string landingPageLink, string adText);
        Task<Id> CreateAd(string name, string adSetId, string creativeId, string status = "PAUSED");
        Task<Report> GetReportForAdSet(string adSetId, string[] fields);
    }
}