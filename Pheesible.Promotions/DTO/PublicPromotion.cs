using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions.DTO
{
    public class PublicPromotion
    {
        public int? id { get; set; }
        public string title { get; set; }
        public int stepNumber { get; set; }
        public string freeText { get; set; }
        public Fields fields { get; set; }
        public Sellingpoint[] sellingPoints { get; set; }
        public Feature[] features { get; set; }
        public Images images { get; set; }
      
        public int templateId { get; set; }
        public string templateName { get; set; }

        public int? statusId { get; set; }
    }
}
