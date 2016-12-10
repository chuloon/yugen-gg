using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace yugen_gg
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "Events",
                url: "Events/{id}",
                defaults: new { controller = "Home", action = "Events", id = UrlParameter.Optional }
                );

            routes.MapRoute(
                name: "About",
                url: "About/{id}",
                defaults: new { controller = "Home", action = "About", id = UrlParameter.Optional }
                );

            routes.MapRoute(
                name: "Register",
                url: "Register/{id}",
                defaults: new { controller = "Register", action = "Register", id = UrlParameter.Optional }
                );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
