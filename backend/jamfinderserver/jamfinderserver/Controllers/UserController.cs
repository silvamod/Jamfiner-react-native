using jamfinderserver.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace jamfinderserver.Controllers
{
    public class UserController : ApiController
    {

        // GET api/<controller>/5
        public string Get(int id)
        {
            return "value";
        }

        // GET api/<controller>
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

        // POST api/<controller>
        public void Post([FromBody]string value)
        {
        }

        // PUT api/<controller>/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/<controller>/5
        public void Delete(int id)
        {
        }
    }
}