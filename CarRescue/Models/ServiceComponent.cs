using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class ServiceComponent
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Type { get; set; }
        public string Options { get; set; }
        public int Status { get; set; }
        public int ServiceId { get; set; }

        public virtual Service Service { get; set; }
    }
}
