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
        private OrderProcesses orderProcesses = new OrderProcesses();


        public OrdersController(CarRescueContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("GetAllOrders")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrder()
        {
            return await _context.Order.OrderByDescending(x => x.Id).ToListAsync();
        }

        [HttpGet]
        [Route("GetAllOrdersByCategory/{typeId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrdersByCategory(int typeId)
        {
            // and status != closed
            return await _context.Order.OrderByDescending(x => x.Id).Where(x=>x.ServiceTypeId == typeId).ToListAsync();
        }

        [HttpGet]
        [Route("GetAllOrdersByUser/{UserId}")]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrdersByUser(int UserId)
        {
            return await _context.Order
                            .Where(x => x.UserId == UserId)
                            .Include(x => x.ServiceType)
                            .Include(x => x.User)
                            .Include(x => x.OrderOffer)
                            .OrderByDescending(x => x.Id)
                            .ToListAsync();
        }

        [HttpGet]
        [Route("GetAllOrdersForProvider/{UserId}")]
        public async Task<IActionResult> GetAllOrdersForProvider(int UserId  ,int PageNo = 1, int PageSize = 10)
        {
            var user = _context.User.Find(UserId);

            int totalItems = _context.Order.Where(x => x.ServiceTypeId == user.UserTypeId
                                           && x.State == user.State
                                           && x.Status == (int)Models.Enums.OrderStatus.Pending)
                                           .Count();

            var providerOrders = await _context.Order
                                    .Where(x => x.ServiceTypeId == user.UserTypeId
                                             && x.State == user.State
                                             && x.Status == (int)Models.Enums.OrderStatus.Pending)
                                    .Include(x => x.ServiceType)
                                    .Include(x => x.User)
                                    .Include(x => x.OrderOffer)
                                    .OrderByDescending(x => x.Id)
                                    .Skip((PageNo - 1) * PageSize)
                                    .Take(PageSize)
                                    .ToListAsync();
            var obj = new
            {
                orders = providerOrders,
                totalOrders = totalItems
            };

            return Ok(obj);
           
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

        [HttpGet]
        [Route("CancelOrder/{id}")]
        public async Task<ActionResult<Order>> CancelOrder(int id)
        {
            var order = await _context.Order.FirstOrDefaultAsync(x => x.Id == id);

            orderProcesses.CloseOrder(order.Id , (int) Models.Enums.OrderStatus.Cancled);

            if (order == null)
            {
                return BadRequest("Error!");
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
        public async Task<ActionResult<Order>> PostOrder([FromBody] Order order)
        {
            order.CreatedDate = DateTime.Now;
            order.Status = (int) Models.Enums.OrderStatus.Pending;
            try
            {
                _context.Order.Add(order);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                return BadRequest("Erorr!");
            }
          

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
