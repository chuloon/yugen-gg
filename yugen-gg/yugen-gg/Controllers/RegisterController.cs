using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Mail;

namespace yugen_gg.Controllers
{
    public class RegisterController : Controller
    {
        // GET: Register
        public ActionResult Register(string id)
        {
            ViewBag.id = id;

            return View();
        }

        
    }
}