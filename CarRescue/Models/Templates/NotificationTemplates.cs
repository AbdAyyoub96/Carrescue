using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRescue.Models.Templates
{
    public class NotificationTemplates
    {
        public static readonly string CreateNewOrder = "{Username} created new order";
        public static readonly string CreateNewOffer = "{Username} add new offer to your order";
        public static readonly string AcceptOffer = "{Username} accepted your offer";
        public static readonly string RejectOffer = "{Username} reject your offer";
        public static readonly string RateUser = "{Username} give you a rate";
    }
}
