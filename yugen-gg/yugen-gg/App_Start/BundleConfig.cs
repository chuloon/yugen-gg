using System.Web;
using System.Web.Optimization;

namespace yugen_gg
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css",
                      "~/Content/css/layout.css"));

            bundles.Add(new StyleBundle("~/Content/assets/styles").Include(
                      "~/content/assets/css/core.css",
                      "~/content/assets/css/components.css",
                      "~/content/assets/css/colors.css"));

            bundles.Add(new ScriptBundle("~/Content/assets/scripts").Include(
                "~/content/assets/js/plugins/loaders/blockui.min.js"));
        }
    }
}
