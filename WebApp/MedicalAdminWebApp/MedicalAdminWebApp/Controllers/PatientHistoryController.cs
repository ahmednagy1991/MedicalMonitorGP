using MedicalAdminWebApp.DBContext;
using MedicalAdminWebApp.ViewModels;
using Microsoft.AspNet.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MedicalAdminWebApp.Controllers
{
    public class PatientHistoryController : Controller
    {
        // GET: PatientHistory
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult DoctorView()
        {
            var model = new HistoryViewModel();
            using (var db = new MedicalMonitoringDBEntities())
            {
                var user_id = User.Identity.GetUserId();
                var pats = db.AspNetUsers
                    .Where(m => m.FK_ParentId == user_id)
                    .Select(s => s.Id)
                    .ToList();
                model.readingList = db.SensorsReadings
                    .Include("AspNetUser")
                    .Where(m => pats.Contains(m.FK_PatientId))
                    .ToList();
            }
            return View(model);
        }
        public ActionResult PatientView()
        {
            var model = new HistoryViewModel();
            using (var db = new MedicalMonitoringDBEntities())
            {
                var user_id = User.Identity.GetUserId();
                model.readingList = db.SensorsReadings
                    .Where(m => m.FK_PatientId == user_id)
                    .ToList();
            }
            return View(model);
        }
    }
}