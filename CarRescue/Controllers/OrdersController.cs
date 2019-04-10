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
    public class OrdersController : ControllerBase
    {
        private readonly CarRescueContext _context;

        public OrdersController(CarRescueContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetAllOrders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order.ToListAsync();
        }

        [HttpGet]
        [Route("GetAllOrdersByCategory/{typeId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrdersByCategory(int typeId)
        {
            // and status != closed
            return await _context.Order.Where(x=>x.ServiceTypeId == typeId).ToListAsync();
        }


        [HttpGet]
        [Route("GetAllOrdersForProvider/{UserId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrdersForProvider(int UserId)
        {
            var user = _context.User.Find(UserId);

            var providerOrders = _context.Order
                                    .Where(x => x.ServiceTypeId == user.UserTypeId
                                             && x.State == user.State
                                             && x.Status == (int)Models.Enums.OrderStatus.Pending)
                                    .Include(x => x.ServiceType)
                                    .Include(x => x.OrderOffer)
                                    .ToListAsync();
            return await providerOrders;
        }


        [HttpGet]
        [Route("GetOrder/{id}")]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _context.Order.Where(x => x.Id == id)
                                .Include(x => x.ServiceType)
                                .Include(x => x.User)
                                .Include(x => x.OrderOffer)
                                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        [HttpPut]
        [Route("EditOrder/{id}")]
        public async Task<IActionResult> EditOrder(int id, Order order)
        {
            if (id != order.Id)
            {
                return BadRequest();
            }

            _context.Entry(order).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!OrderExists(id))
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

        // POST: api/Orders
        [HttpPost]
        [Route("PostOrder")]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            _context.Order.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetOrder", new { id = order.Id }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete]
        [Route("DeleteOrder/{id}")]
        public async Task<ActionResult<Order>> DeleteOrder(int id)
        {
            var order = await _context.Order.FindAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            _context.Order.Remove(order);
            await _context.SaveChangesAsync();

            return order;
        }

        private bool OrderExists(int id)
        {
            return _context.Order.Any(e => e.Id == id);
        }
    }
}
