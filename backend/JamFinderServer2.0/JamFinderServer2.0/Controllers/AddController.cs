using JamFinderServer2._0.Models;
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


namespace JamfinderServer2._0.Controllers
{
    public class AddController : ApiController
    {

        //adds a new user to the DB
        [Route("creatuser")]
        public IHttpActionResult Post(string asd, string nme, string bio)
        {
            User User = new User(asd, nme, bio);
            return Ok(User.addToDB());
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