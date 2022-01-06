using MedicalAdminWebApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MedicalAdminWebApp.ViewModels
{
    public class AssignPatientViewModel
    {
        public List<SelectListItem> patientList { get; set; }
        public List<SelectListItem> doctorList { get; set; }
        public string SelectedPatient { get; set; }
        public string SelectedDoctor { get; set; }
    }
}