using MedicalAdminWebApp.DBContext;
using MedicalAdminWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using System.Web;

namespace MedicalAdminWebApp.Controllers
{
    public class DeviceOperationsController : ApiController
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;


        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.Current.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.Current.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }


        [HttpGet]
        public string Ping()
        {
            return "Pong";
        }



        [HttpPost]
        public IHttpActionResult RegisterPatient(RegisterViewModel model)
        {
            model.Password = "Dev1991@";
            var user = new ApplicationUser
            {
                UserName = model.Username,
                Email = model.Email,
                PhoneNumber = model.Mobile,
                Age = model.age
            };

            var result = UserManager.Create(user, model.Password);

            if (result.Succeeded)
            {
                UserManager.AddToRole(user.Id, "Patient");
                //SignInManager.SignInAsync(user, isPersistent: false, rememberBrowser: false);
            }
            else
            {
                return Content(HttpStatusCode.BadRequest, "Error occuerd contact admin");
            }

            return Ok(user.Id);
        }

        [HttpPost]
        public IHttpActionResult ReadSensors(SensorsReading model)
        {
            using (var db = new MedicalMonitoringDBEntities())
            {
                //var model = new SensorsReading()
                //{
                //    FK_PatientId = userId,
                //    Latitude = latitude,
                //    Longitude = longitude,
                //    HR = HR,
                //    Temprature = Temp,
                //    ReadingDate = DateTime.Now,
                //};
                model.ReadingDate = DateTime.Now;
                db.SensorsReadings.Add(model);
                db.SaveChanges();
            }

            return Ok("Done");
        }




    }
}
