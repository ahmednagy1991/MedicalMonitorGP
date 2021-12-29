using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MedicalAdminWebApp.Startup))]
namespace MedicalAdminWebApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
