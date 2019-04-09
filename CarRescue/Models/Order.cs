using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class Order
    {
        public Order()
        {
            OrderOffer = new HashSet<OrderOffer>();
        }

        public int Id { get; set; }
        public int UserId { get; set; }
        public string Locations { get; set; }
        public int ServiceTypeId { get; set; }
        public int Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public string Notes { get; set; }
        public string GasType { get; set; }
        public int? GasQuantity { get; set; }
        public int? CarType { get; set; }
        public int? CarModel { get; set; }
        public int? ManuYear { get; set; }
        public int State { get; set; }

        public virtual Service ServiceType { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<OrderOffer> OrderOffer { get; set; }
    }
}
