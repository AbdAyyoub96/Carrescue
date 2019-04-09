using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class OrderOffer
    {
        public int Id { get; set; }
        public int OrderId { get; set; }
        public int UserId { get; set; }
        public string Location { get; set; }
        public int? ExpectedArrivalTime { get; set; }
        public int? Price { get; set; }
        public int Status { get; set; }
        public string Notes { get; set; }
        public int State { get; set; }

        public virtual Order Order { get; set; }
        public virtual User User { get; set; }
    }
}
