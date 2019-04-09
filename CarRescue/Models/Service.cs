using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class Service
    {
        public Service()
        {
            Order = new HashSet<Order>();
            ServiceComponent = new HashSet<ServiceComponent>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Status { get; set; }

        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<ServiceComponent> ServiceComponent { get; set; }
    }
}
