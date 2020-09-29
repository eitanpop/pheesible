using System;
using System.Collections.Generic;
using System.Text;

namespace Pheesible.Scheduler.Jobs
{
    public class JobResponse
    {
        public string JobName { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public string ResultSummary { get; set; }
        public string AdditionalInformation { get; set; }
        public bool IsSuccess { get; set; }
    }
}
