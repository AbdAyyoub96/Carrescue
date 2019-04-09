using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class Notification
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public string Link { get; set; }
        public int UserId { get; set; }
        public DateTime CreatedDate { get; set; }

        public virtual User User { get; set; }
    }
}
