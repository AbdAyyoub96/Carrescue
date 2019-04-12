using CarRescue.Models;
using CarRescue.Models.Templates;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRescue.Controllers
{
    public class NotificationProvider
    {
        private readonly CarRescueContext _context;

        private NotificationTemplates templates = new NotificationTemplates();

        public NotificationProvider( )
        {
            _context = new CarRescueContext();
        }

        public void CreateNewNotification(int userId ,int notifiedUserId , string template , string link)
        {
            var user = _context.User.FirstOrDefault(x => x.Id == userId);

            template = template.Replace("{Username}", user.Username);

            Notification notification = new Notification
            {
                UserId = notifiedUserId,
                CreatedDate = DateTime.Now,
                Link = link,
                Message = template
            };

            try
            {
                _context.Notification.Add(notification);
                _context.SaveChanges();
            }
            catch (Exception e)
            {

                throw;
            }
        }
    }
}
