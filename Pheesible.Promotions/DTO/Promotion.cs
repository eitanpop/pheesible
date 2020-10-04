using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Pheesible.Promotions.DTO
{
    public class Promotion : PublicPromotion
    {
        public string identityId { get; set; }
        public Facebook facebook { get; set; }
        public Ad ad { get; set; }
    }

    public class Fields
    {
        public string title { get; set; }
        public string tagLine { get; set; }
        public string elevatorPitch { get; set; }
        public string banner { get; set; }
        public string logo { get; set; }
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
    public class Ad
    {
        public string image { get; set; }
        public string text { get; set; }
    }

    public class Facebook
    {
        public bool isEnabled { get; set; }
        public bool includeInstagram { get; set; }
        public string numberOfDays { get; set; }
        public string budgetPerDayInDollars { get; set; }
    }

}
