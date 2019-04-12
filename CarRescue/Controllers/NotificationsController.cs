using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRescue.Models;

namespace CarRescue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationsController : ControllerBase
    {
        private readonly CarRescueContext _context;

        public NotificationsController(CarRescueContext context)
        {
            _context = context;
        }

        // GET: api/Notifications
        [HttpGet]
        [Route("GetAllNotificationByUser/{UserId}")]
        public async Task<ActionResult<IEnumerable<Notification>>> GetNotification(int UserId)
        {
            return await _context.Notification
                                    .Where(x => x.UserId == UserId)
                                    .OrderByDescending(x => x.Id)
                                    .ToListAsync();
        }
    }
}
