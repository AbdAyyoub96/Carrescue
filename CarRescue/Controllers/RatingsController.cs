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
    public class RatingsController : ControllerBase
    {
        private readonly CarRescueContext _context;

        public RatingsController(CarRescueContext context)
        {
            _context = context;
        }

        // GET: api/Ratings
        [HttpGet]
        [Route("GetAllRating")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRating()
        {
            return await _context.Rating.ToListAsync();
        }


        // GET: api/Ratings
        [HttpGet]
        [Route("GetRatingOfUser/{UserId}")]
        public async Task<ActionResult<IEnumerable<Rating>>> GetRatingOfUser(int UserId)
        {
            return await _context.Rating.Where(x => x.RatedUser == UserId)
                                .Include(x=>x.RatedUserNavigation)
                                .ToListAsync();
        }

        // GET: api/Ratings/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Rating>> GetRating(int id)
        {
            var rating = await _context.Rating.FindAsync(id);

            if (rating == null)
            {
                return NotFound();
            }

            return rating;
        }

      

        // POST: api/Ratings
        [HttpPost]
        [Route("CreateRate")]
        public async Task<ActionResult<Rating>> PostRating([FromBody] Rating rating)
        {
            _context.Rating.Add(rating);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetRating", new { id = rating.Id }, rating);
        }

       
        private bool RatingExists(int id)
        {
            return _context.Rating.Any(e => e.Id == id);
        }
    }
}
