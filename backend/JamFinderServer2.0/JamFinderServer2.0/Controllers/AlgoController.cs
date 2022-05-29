using Nancy.Json;
using System.Text.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;


namespace JamFinderServer2._0.Controllers
{
    public class AlgoController : ApiController
    {
        // GET api/<controller>
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<controller>/5
        public string Get(int id)
        {
            //var url = "http://omer3020.pythonanywhere.com/algo/kfir";
            //var httpWebRequest = (HttpWebRequest)WebRequest.Create(url);
            //httpWebRequest.ContentType = "application/json";
            //httpWebRequest.Method = "POST";
            //using (var streamWriter = new System.IO.StreamWriter(httpWebRequest.GetRequestStream()))
            //{
            //    string json = new JavaScriptSerializer().Serialize(new
            //    {
            //        user = "Foo",
            //        password = "Baz",
            //        s = ["ss","ss"]
            //    });

            //    streamWriter.Write(json);
            //}
            return "value";
        }

        // POST api/<controller>
        public void Post([FromBody] string value)
        {
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