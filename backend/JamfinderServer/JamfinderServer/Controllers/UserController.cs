using JamfinderServer.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;

namespace JamfinderServer.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class UserController : ApiController
    {

    

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
            List<User> a = User.getMatches(targetUser);
            return Ok(a);

        }

        //adds a new user to the DB
        [HttpPost]
        [Route("newuser")]
        public IHttpActionResult Put(string asd, string nme, string bio)
        {
            User User = new User(asd, nme, bio);
            return Ok(User.addToDB());
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


        // PUT api/<controller>/5 for IMG
        [Route("updateuser")]
        public IHttpActionResult Put(string img, string email)
        {
            User User = new User();
            return Ok(User.changeImg(img, email));

        }

     
    }
}