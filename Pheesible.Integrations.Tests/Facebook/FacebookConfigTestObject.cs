using Pheesible.Integrations.Facebook;
using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Integrations.Tests
{
    public class FacebookConfigTestObject : IFacebookConfig
    {
        string IFacebookConfig.AppId { get => "692846877981940"; set => throw new NotImplementedException(); }
        string IFacebookConfig.AppSecret { get => "d325b2ebb5b150bb22adfc0b7998666f"; set => throw new NotImplementedException(); }
        string IFacebookConfig.ApiVersion { get => "8.0"; set => throw new NotImplementedException(); }
        string IFacebookConfig.AdAccountId { get => "359957018532140"; set => throw new NotImplementedException(); }
        string IFacebookConfig.AccessToken { get => "EAAJ2IZCwLvPQBALt4EAZAZCWD8P1z4iPq6ytlCJpt4cnjonTpbtEnA5w3nwZCc6BVqOnLZC4APn6tq8B4mbZCuZAAEXKnZAGRIHVH2z43CErr2Vwpn6E18fnOsHDysVZC8hwLZCHGSvjxBFsab57G7ENf2RwufWYQdNKw7EEouykKdQwZDZD"; set => throw new NotImplementedException(); }
        string IFacebookConfig.Objective { get => "LINK_CLICKS"; set => throw new NotImplementedException(); }
        string IFacebookConfig.OptimizationGoal { get => "LANDING_PAGE_VIEWS"; set => throw new NotImplementedException(); }
        string IFacebookConfig.BillingEvent { get => "IMPRESSIONS"; set => throw new NotImplementedException(); }
        string IFacebookConfig.PageId { get => "110027460859590"; set => throw new NotImplementedException(); }
        string IFacebookConfig.CampaignId { get => "23845705642030146"; set => throw new NotImplementedException(); }
        string IFacebookConfig.CallToAction { get => "LEARN_MORE"; set => throw new NotImplementedException(); }
    }
}
