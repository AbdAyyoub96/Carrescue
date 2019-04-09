using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class Report
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public int ReportedUser { get; set; }
        public int ReportType { get; set; }
        public string Note { get; set; }

        public virtual User ReportedUserNavigation { get; set; }
        public virtual User User { get; set; }
    }
}
