using JamfinderServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JamfinderServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {

        // GET api/<controller>/5
        [HttpGet]
        public string Get(int id)
        {
            return "value";
        }

        // GET api/<controller>
        [HttpGet]
        public IHttpActionResult Get()
        {
            try
            {
                User User = new User();
                List<User> list = User.getUsers();
                return Ok(list);
            }
            catch (Exception ex)
            {
                //return BadRequest(ex.Message);
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }
        [HttpGet]
        public IHttpActionResult Get(string email)
        {
            try
            {
                User User = new User();
                User list = User.getUser(email);
                return Ok(list);
            }
            catch (Exception ex)
            {
                //return BadRequest(ex.Message);
                return Content(HttpStatusCode.BadRequest, ex);
            }

        }

        
        public IHttpActionResult GetLikes(string userLike)
        {
            User User = new User();
            List<String> likes = User.getLikes(userLike);
            return Ok(likes);
        }

        public IHttpActionResult GetMatches(string targetUser)
        {
            User User = new User();
            List<String> a = User.getMatches(targetUser);
            return Ok(a);

        }


        public IHttpActionResult PostMatch(string match1, string match2)
        {
            User User = new User();
            return Ok(User.addMatch(match1, match2));
        }

        // POST api/<controller>
        public IHttpActionResult PostLike(string user, string targetUser)
        {
            User User = new User();
            User.addLike(user, targetUser);
            return Ok(User.checkMatch(user, targetUser));
        }


        // PUT api/<controller>/5
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}