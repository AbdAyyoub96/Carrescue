using System;
using System.Collections.Generic;

namespace CarRescue.Models
{
    public partial class UserType
    {
        public UserType()
        {
            User = new HashSet<User>();
        }

        public int Id { get; set; }
        public string TypeName { get; set; }
        public int Status { get; set; }

        public virtual ICollection<User> User { get; set; }
    }
}
