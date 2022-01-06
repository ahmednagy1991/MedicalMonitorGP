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
            return View();
        }
        public ActionResult PatientView()
        {
            return View();
        }
    }
}