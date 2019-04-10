using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CarRescue.Models;
using CarRescue.Models.Enums;
using System.IO;
using Microsoft.AspNetCore.Hosting;

namespace CarRescue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly CarRescueContext _context;
        private IHostingEnvironment _hostingEnvironment;
        public UsersController(CarRescueContext context , IHostingEnvironment hostingEnvironment)
        {
            _context = context;
            _hostingEnvironment = hostingEnvironment;
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
            var user = await _context.User.Where(x => x.Id == id)
                                .Include(x => x.Order)
                                .Include(x => x.OrderOffer)
                                .Include(x => x.RatingRatedUserNavigation)
                                .FirstOrDefaultAsync();

            if (user == null)
            {
                return BadRequest("User Not Found");
            }

            return user;
        }

      
        // GET: api/Users/5
        [HttpPost]
        [Route("Login")]
        public async Task<ActionResult<User>> Login([FromBody] User user)
        {
            var userInDb = await _context.User.FirstOrDefaultAsync( x=>x.Username == user.Username && x.Password == user.Password );

            if (userInDb == null)
            {
                return BadRequest("Invalid Username or Password");
            }

            return userInDb;
        }

        [HttpPost]
        [Route("PostUserAttachments")]
        public async Task<IActionResult> PostRequestAttachmentsAsync(IFormFile File)
        {
            // full path to file in temp location
            string path = this._hostingEnvironment.WebRootPath + "\\uploads\\UserAttachments\\" + DateTime.Now.ToString("dd MMMM yyyy");

            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
            string fullPath = Path.Combine(path, File.FileName);
            if (File.Length > 0)
            {
                using (var stream = new FileStream(fullPath, FileMode.Create))
                {
                    try
                    {
                        await File.CopyToAsync(stream);
                    }
                    catch (Exception e)
                    {
                        throw e;
                    }
                }
            }

            object fileObj = new
            {
                FileName = File.FileName
            };

            return Ok(fileObj);
        }

        [HttpGet]
        [Route("GetUserTypes")]
        public async Task<ActionResult<IEnumerable<UserType>>> GetUserTypes()
        {
            return await _context.UserType.Where(x=>x.Status == (int) UserTypesStatus.Active).ToListAsync();
        }
        [HttpGet]
        [Route("GetUserServices")]
        public async Task<ActionResult<IEnumerable<Service>>> GetUserServices()
        {
            return await _context.Service.ToListAsync();
        }

        // PUT: api/Users/5
        [HttpPut]
        [Route("EditUserData/{id}")]
        public async Task<IActionResult> PutUser(int id, [FromBody] User user)
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
        public async Task<ActionResult<User>> SignUp([FromBody] User user)
        {
            var username = _context.User.FirstOrDefault(x => x.Username == user.Username);

            var email = _context.User.FirstOrDefault(x => x.Email == user.Email);
            
            if(username != null)
            {
                return BadRequest("Username is already exist");
            }

            if (email != null)
            {
                return BadRequest("Email is already exist");
            }

            user.Status = (int) UserTypesStatus.Active;

            try
            {
                _context.User.Add(user);

                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {

               return BadRequest("Error !");
            }
  

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
