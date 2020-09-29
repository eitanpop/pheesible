namespace Pheesible.Integrations.Facebook
{
    public interface IFacebookConfig
    {
        string AppId { get; }
        string AppSecret { get; }
        string ApiVersion { get; }
        string AdAccountId { get; }
        string AccessToken { get; }
        string Objective { get; }
        string OptimizationGoal { get; }
        string BillingEvent { get; }
        string PageId { get; }
        string CampaignId { get; }
        string CallToAction { get; }
    }
}