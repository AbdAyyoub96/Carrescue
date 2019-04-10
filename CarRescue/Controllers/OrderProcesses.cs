using CarRescue.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRescue.Controllers
{
    public class OrderProcesses
    {
        private readonly CarRescueContext _context;

        public OrderProcesses()
        {
            _context = new CarRescueContext();
        }

        public void CloseOrder(int orderId , int status)
        {
            var order = _context.Order.FirstOrDefault(x => x.Id == orderId);
            order.Status = status;

            try
            {
                _context.Entry(order).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                _context.SaveChanges();
            }
            catch (Exception e)
            {

                throw;
            }
          
        }
    }
}
