using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Integrations.Facebook
{

    public class Rootobject
    {
        public Images images { get; set; }
    }

    public class Images
    {
        public TestimagePng TestImagepng { get; set; }
    }

    public class TestimagePng
    {
        public string hash { get; set; }
        public string url { get; set; }
    }

}
