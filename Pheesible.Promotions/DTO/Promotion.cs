using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Pheesible.Promotions.DTO
{
    public class Promotion
    {
        public int stepNumber { get; set; }
        public int template { get; set; }
        public string identityId { get; set; }
        public Fields fields { get; set; }
        public Sellingpoint[] sellingPoints { get; set; }
        public Feature[] features { get; set; }
        public Images images { get; set; }
        public Promotionsettings promotionSettings { get; set; }
    }

    public class Fields
    {
        public string title { get; set; }
        public string tagLine { get; set; }
        public string elevatorPitch { get; set; }
        public string banner { get; set; }
        public string logo { get; set; }
    }

    public class Promotionsettings
    {
        public Facebook Facebook { get; set; }
        public Instagram Instagram { get; set; }
        public Twitter Twitter { get; set; }
        public Tiktok Tiktok { get; set; }
    }

    public class Facebook : FocusGroupDto
    {
        public override string Name => "facebook";
    }

    public class Instagram : FocusGroupDto
    {
        public override string Name => "instagram";
    }

    public class Twitter : FocusGroupDto
    {
        public override string Name => "twitter";
    }

    public class Tiktok : FocusGroupDto
    {
        public override string Name => "tiktok";
    }

    public abstract class FocusGroupDto
    {
        public abstract string Name { get; }
        public string lengthInDaysOfPromotion { get; set; }
        public string budgetPerDayInDollars { get; set; }
    }

    public class Sellingpoint
    {
        public string title { get; set; }
        public string description { get; set; }
    }

    public class Feature
    {
        public string title { get; set; }
        public string description { get; set; }
    }
    public class Images
    {
        public string imageOne { get; set; }
        public string imageTwo { get; set; }
        public string imageThree { get; set; }
    }

}
