using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRescue.Models;
using CarRescue.Models.Templates;

namespace CarRescue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderOffersController : ControllerBase
    {
        private readonly CarRescueContext _context;
        private OrderProcesses orderProcesses = new OrderProcesses();
        private NotificationProvider notificationProvider = new NotificationProvider();
        public OrderOffersController(CarRescueContext context)
        {
            _context = context;
        }

        // GET: api/OrderOffers
        [HttpGet]
        [Route("GetAllOffers")]
        public async Task<ActionResult<IEnumerable<OrderOffer>>> GetOrderOffer()
        {
            return await _context.OrderOffer.ToListAsync();
        }

        [HttpGet]
        [Route("ChangeOfferStatus/{id}/{status}")]
        public async  Task<ActionResult> ChangeOfferStatus(int id , int status)
        {
            var offer = _context.OrderOffer.Find(id);
            var order = _context.Order.Find(offer.OrderId);

            if(offer == null)
            {
                return BadRequest("Offer Not Found !");
            }

            offer.Status = status; // Accepted
            try
            {
                _context.Entry(offer).State = EntityState.Modified;
                await _context.SaveChangesAsync();
            
                switch (offer.Status)
                {
                    case (int)Models.Enums.OfferStatus.Accepted: 
                            notificationProvider.CreateNewNotification(order.UserId, offer.UserId,  NotificationTemplates.AcceptOffer, "");
                            orderProcesses.CloseOrder(offer.OrderId , (int)Models.Enums.OrderStatus.Served);
                         break;

                    case (int)Models.Enums.OfferStatus.Rejected:
                        notificationProvider.CreateNewNotification(order.UserId, offer.UserId, NotificationTemplates.RejectOffer, "");
                        break;
                }

            }
            catch (Exception e)
            {

                return BadRequest("Error !");
            }
          
            return Ok(offer);
        }
        // GET: api/OrderOffers
        [HttpGet]
        [Route("GetOffersByOrderId/{orderId}")]
        public async Task<ActionResult<IEnumerable<OrderOffer>>> GetOrderOffer(int orderId)
        {
            return await _context.OrderOffer.Where(x => x.OrderId == orderId)
                        .Include(x => x.User)
                        .ToListAsync();
        }

        // GET: api/OrderOffers/5
        [HttpGet]
        [Route("GetOrderOfferById/{id}")]
        public async Task<ActionResult<OrderOffer>> GetOrderOfferById(int id)
        {
            var orderOffer = await _context.OrderOffer.FindAsync(id);

            if (orderOffer == null)
            {
                return NotFound();
            }

            return orderOffer;
        }

        // PUT: api/OrderOffers/5
        [HttpPut]
        [Route("EditOffer/{id}")]
        public async Task<IActionResult> PutOrderOffer(int id, OrderOffer orderOffer)
        {
            if (id != orderOffer.Id)
            {
                return BadRequest();
            }

            _context.Entry(orderOffer).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderOfferExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/OrderOffers
        [HttpPost]
        [Route("CreateOffer")]
        public async Task<ActionResult<OrderOffer>> PostOrderOffer([FromBody] OrderOffer orderOffer)
        {
            var order = _context.Order.Find(orderOffer.OrderId);
            orderOffer.Status = (int) Models.Enums.OfferStatus.Pending; // Pending

            try
            {
                _context.OrderOffer.Add(orderOffer);
                
                await _context.SaveChangesAsync();
                notificationProvider.CreateNewNotification(orderOffer.UserId, order.UserId, NotificationTemplates.CreateNewOffer, "");
            }
            catch (Exception e)
            {

                throw;
            }


            return CreatedAtAction("GetOrderOffer", new { id = orderOffer.Id }, orderOffer);
        }

        // DELETE: api/OrderOffers/5
        [HttpDelete]
        [Route("DeleteOrderOffer/{id}")]
        public async Task<ActionResult<OrderOffer>> DeleteOrderOffer(int id)
        {
            var orderOffer = await _context.OrderOffer.FindAsync(id);
            if (orderOffer == null)
            {
                return NotFound();
            }

            _context.OrderOffer.Remove(orderOffer);
            await _context.SaveChangesAsync();

            return orderOffer;
        }

        private bool OrderOfferExists(int id)
        {
            return _context.OrderOffer.Any(e => e.Id == id);
        }
    }
}
