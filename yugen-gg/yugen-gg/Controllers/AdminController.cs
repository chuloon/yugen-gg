﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace yugen_gg.Controllers
{
    public class AdminController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult Login()
        {
            return View();
        }

        public ActionResult Events(string id)
        {
            ViewBag.id = id;

            return View();
        }
    }
}