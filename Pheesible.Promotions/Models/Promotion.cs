using System.Collections.Generic;

namespace Pheesible.Promotions.Models
{
    public class Promotion
    {
        public int Id { get; set; }

        public string ElevatorPitch { get; set; }

        public string Title { get; set; }

        public IList<Features> Features { get; set; }

        public IList<PromotionSettings> PromotionSettings { get; set; }


    }
}
