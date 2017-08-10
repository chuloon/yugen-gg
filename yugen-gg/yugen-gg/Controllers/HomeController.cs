using FireSharp;
using FireSharp.Config;
using FireSharp.Interfaces;
using FireSharp.Response;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Mvc;

namespace yugen_gg.Controllers
{
    public class HomeController : Controller
    {
        public async System.Threading.Tasks.Task<ActionResult> Index()
        {
            IFirebaseConfig config = new FirebaseConfig
            {
                AuthSecret = "OsprEPZtYgU1bP2xKP3OVujZIPt7tNo0BLrg0gO4",
                BasePath = "https://yugen-a088d.firebaseio.com"
            };

            IFirebaseClient client = new FirebaseClient(config);

            FirebaseResponse response = await client.GetAsync("/mailing-list/");
            var body = Newtonsoft.Json.JsonConvert.DeserializeObject(response.Body);

            return View();
        }

        public ActionResult About()
        {
            return View();
        }

        public ActionResult Events()
        {
            return View();
        }

        public ActionResult Rules()
        {
            return View();
        }

        public class Todo
        {
            public string email { get; set; }
        }
    }
}