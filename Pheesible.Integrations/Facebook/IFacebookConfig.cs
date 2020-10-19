namespace Pheesible.Integrations.Facebook
{
    public interface IFacebookConfig
    {
        string AppId { get; set; }
        string AppSecret { get; set; }
        string ApiVersion { get; set; }
        string AdAccountId { get; set; }
        string AccessToken { get; set; }
        string Objective { get; set; }
        string OptimizationGoal { get; set; }
        string BillingEvent { get; set; }
        string PageId { get; set; }
        string CampaignId { get; set; }
        string CallToAction { get; set; }
    }
}