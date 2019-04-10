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
    public class UsersController : ControllerBase
    {
        private readonly CarRescueContext _context;

        public UsersController(CarRescueContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        [Route("GetAllUsers")]
        public async Task<ActionResult<IEnumerable<User>>> GetUser()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet]
        [Route("GetUserById/{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // GET: api/Users/5
        [HttpGet]
        [Route("GetUserTypes")]
        public async Task<ActionResult<User>> GetUserTypes()
        {
            var user = await _context.UserType.ToListAsync();
            
            return Ok(user);
        }

        // GET: api/Users/5
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<User>> Login(User user)
        {
            var userInDb = await _context.User.FirstOrDefaultAsync( x=>x.Username == user.Username || x.Password == user.Password );

            if (user == null)
            {
                return BadRequest("Invalid Username or Password");
            }

            return user;
        }

        // PUT: api/Users/5
        [HttpPut]
        [Route("EditUserData/{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        [HttpPost]
        [Route("SignUp")]
        public async Task<ActionResult<User>> SignUp([FromBody]User user)
        {
            user.Status = 1; 

            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        // DELETE: api/Users/5
        [HttpDelete]
        [Route("DeleteUser/{id}")]
        public async Task<ActionResult<User>> DeleteUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return user;
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }
    }
}
