using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Integrations.Facebook
{
    public class AdCreative
    {
        public string page_id { get; set; }
        public Link_Data link_data { get; set; }
    }

    public class Link_Data
    {
        public string image_hash { get; set; }
        public string link { get; set; }
        public string message { get; set; }

        public Call_To_Action call_to_action { get; set; }
    }
}


public class Call_To_Action
{
    public string type { get; set; }
   
}
