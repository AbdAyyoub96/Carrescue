using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRescue.Models.Enums
{
    public enum UserTypes
    {
        User = 1,
        Mechanic = 2,
        Electrician = 3,
        Gas = 4

    }

    public enum UserTypesStatus
    {
        Active = 1,
        InActive = 2,
        Blocked = 3
    }
}
