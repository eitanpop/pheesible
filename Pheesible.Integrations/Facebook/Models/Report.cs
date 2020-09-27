using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Integrations.Facebook.Models
{
    public class Report
    {
        public Data[] data { get; set; }
        public Paging paging { get; set; }
    }

    public class Paging
    {
        public Cursors cursors { get; set; }
    }

    public class Cursors
    {
        public string before { get; set; }
        public string after { get; set; }
    }

    public class Data
    {
        public string clicks { get; set; }
        public string actions { get; set; }
        public string impressions { get; set; }
        public string date_start { get; set; }
        public string date_stop { get; set; }
    }

}
