using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions.DTO
{

    public class Promotion
    {
        public int stepNumber { get; set; }
        public int template { get; set; }
        public Fields fields { get; set; }
        public Sellingpoint[] sellingPoints { get; set; }
        public Feature[] features { get; set; }
        public Promotionsettings promotionSettings { get; set; }
    }

    public class Fields
    {
        public string title { get; set; }
        public string tagLine { get; set; }
        public string elevatorPitch { get; set; }
    }

    public class Promotionsettings
    {
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

}
