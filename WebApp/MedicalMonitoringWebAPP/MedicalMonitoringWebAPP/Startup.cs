using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(MedicalMonitoringWebAPP.Startup))]
namespace MedicalMonitoringWebAPP
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
