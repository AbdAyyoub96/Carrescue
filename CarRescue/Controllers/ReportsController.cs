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
    public class ReportsController : ControllerBase
    {
        private readonly CarRescueContext _context;

        public ReportsController(CarRescueContext context)
        {
            _context = context;
        }

        // GET: api/Reports
        [HttpGet]
        [Route("GetAllReports")]
        public async Task<ActionResult<IEnumerable<Report>>> GetReport()
        {
            return await _context.Report
                            .Include(x => x.ReportedUserNavigation)
                            .Include(x => x.User)
                            .OrderByDescending(x => x.Id)
                            .ToListAsync();
        }

        // GET: api/Reports/5
        [HttpGet]
        [Route("GetReport/{id}")]
        public async Task<ActionResult<Report>> GetReport(int id)
        {
            var report = await _context.Report.FindAsync(id);

            if (report == null)
            {
                return NotFound();
            }

            return report;
        }

         // GET: api/Reports/5
        [HttpGet("{id}")]
        [Route("GetReportByUserId/{UserId}")]
        public async Task<ActionResult<IEnumerable<Report>>> GetReportByUserId(int UserId)
        {
            var reports = await _context.Report
                                .Where(x=>x.ReportedUser == UserId)
                                .Include(x=>x.ReportedUserNavigation)
                                .Include(x=>x.User)
                                .OrderByDescending(x => x.Id)
                                .ToListAsync();

            if (reports == null)
            {
                return NotFound();
            }

            return reports;
        }

        
        // POST: api/Reports
        [HttpPost]
        [Route("CreateReport")]
        public async Task<ActionResult<Report>> PostReport(int id ,[FromBody] Report report)
        {
            report.ReportedUser = id;
            try
            {
                _context.Report.Add(report);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

                throw;
            }
       

            return CreatedAtAction("GetReport", new { id = report.Id }, report);
        }

        // DELETE: api/Reports/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Report>> DeleteReport(int id)
        {
            var report = await _context.Report.FindAsync(id);
            if (report == null)
            {
                return NotFound();
            }

            _context.Report.Remove(report);
            await _context.SaveChangesAsync();

            return report;
        }

        private bool ReportExists(int id)
        {
            return _context.Report.Any(e => e.Id == id);
        }
    }
}
