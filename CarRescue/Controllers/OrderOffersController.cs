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
    public class OrderOffersController : ControllerBase
    {
        private readonly CarRescueContext _context;

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
        [Route("AcceptOffer/{id}")]
        public ActionResult AcceptOffer(int id)
        {
            var offer = _context.OrderOffer.Find(id);

            if(offer == null)
            {
                return BadRequest("Offer Not Found !");
            }

            offer.Status = 1 ; // Accepted
            try
            {
                _context.Entry(offer).State = EntityState.Modified;
                _context.SaveChanges();
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
        public async Task<ActionResult<OrderOffer>> PostOrderOffer(OrderOffer orderOffer)
        {
            orderOffer.Status = 1; // Pending

            _context.OrderOffer.Add(orderOffer);
            await _context.SaveChangesAsync();

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
