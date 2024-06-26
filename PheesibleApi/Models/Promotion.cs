﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PheesibleApi.Models
{
    public class Promotion
    {
        public int Id { get; set; }

        public int TemplateId { get; set; }

        public string ElevatorPitch { get; set; }

        public string Title { get; set; }

        public IList<Features> Features { get; set; }

        public IList<PromotionSettings> PromotionSettings { get; set; }


    }
}
