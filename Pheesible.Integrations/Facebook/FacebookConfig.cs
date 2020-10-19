namespace Pheesible.Integrations.Facebook
{
    public class FacebookConfig : IFacebookConfig
    {
        public string ApiVersion { get; set; }
        public string AdAccountId { get; set; }
        public string AccessToken { get; set; }
        public string Objective { get; set; }
        public string OptimizationGoal { get; set; }
        public string BillingEvent { get; set; }
        public string AppId { get; set; }
        public string AppSecret { get; set; }
        public string PageId { get; set; }
        public string CampaignId { get; set; }
        public string CallToAction { get; set; }
    }
}