using Pheesible.Integrations.Facebook;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Integrations.Tests
{
    public class FacebookConfigTestObject : IFacebookConfig
    {
        public string ApiVersion => "8.0";
        public string AdAccountId => "359957018532140";
        public string AccessToken => "EAAJ2IZCwLvPQBALt4EAZAZCWD8P1z4iPq6ytlCJpt4cnjonTpbtEnA5w3nwZCc6BVqOnLZC4APn6tq8B4mbZCuZAAEXKnZAGRIHVH2z43CErr2Vwpn6E18fnOsHDysVZC8hwLZCHGSvjxBFsab57G7ENf2RwufWYQdNKw7EEouykKdQwZDZD";

        public string Objective => "LINK_CLICKS";

        public string OptimizationGoal => "LANDING_PAGE_VIEWS";

        public string BillingEvent => "IMPRESSIONS";

        public string AppId => "692846877981940";

        public string AppSecret => "d325b2ebb5b150bb22adfc0b7998666f";

        public string PageId => "110027460859590";
        public string CampaignId => "23";
        public string CallToAction => "LEARN_MORE";
    }
}
