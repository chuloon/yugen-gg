using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(yugen_gg.Startup))]
namespace yugen_gg
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
