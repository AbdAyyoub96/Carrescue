using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class User
    {
        public User()
        {
            Notification = new HashSet<Notification>();
            Order = new HashSet<Order>();
            OrderOffer = new HashSet<OrderOffer>();
            RatingRatedUserNavigation = new HashSet<Rating>();
            RatingUser = new HashSet<Rating>();
            ReportReportedUserNavigation = new HashSet<Report>();
            ReportUser = new HashSet<Report>();
        }

        public int Id { get; set; }
        public string FullName { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string MobileNumber { get; set; }
        public string Email { get; set; }
        public string Attachment { get; set; }
        public int Status { get; set; }
        public int UserTypeId { get; set; }

        public virtual UserType UserType { get; set; }
        public virtual ICollection<Notification> Notification { get; set; }
        public virtual ICollection<Order> Order { get; set; }
        public virtual ICollection<OrderOffer> OrderOffer { get; set; }
        public virtual ICollection<Rating> RatingRatedUserNavigation { get; set; }
        public virtual ICollection<Rating> RatingUser { get; set; }
        public virtual ICollection<Report> ReportReportedUserNavigation { get; set; }
        public virtual ICollection<Report> ReportUser { get; set; }
    }
}
