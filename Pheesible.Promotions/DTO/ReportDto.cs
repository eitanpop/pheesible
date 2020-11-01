
using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions.DTO
{
    public class ReportDto
    {
        public string facebookUrl { get; set; }
        public List<Lead> leads { get; set; }
        public IList<Entry> entries { get; set; }
        public Promotion promotion { get; set; }
    }

    public class Entry
    {
        public string reach { get; set; }
        public string clicks { get; set; }
        public string date_start { get; set; }
        public string date_stop { get; set; }
        public string impressions { get; set; }
        public string spend { get; set; }
        public string age { get; set; }
        public string gender { get; set; }

    }
}
