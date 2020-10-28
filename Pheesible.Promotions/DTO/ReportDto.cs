using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Promotions.DTO
{
    public class ReportDto
    {
        public IList<Entry> Entries { get; set; }
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
