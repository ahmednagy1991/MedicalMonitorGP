﻿using MedicalAdminWebApp.DBContext;
using MedicalAdminWebApp.Models;
using MedicalAdminWebApp.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MedicalAdminWebApp.Controllers
{
    [Authorize(Roles = "Admin")]
    public class ManageUserAccountsController : Controller
    {
        // GET: ManageUserAccounts
        public ActionResult Index()
        {

            var model = new UsersAccountsViewModel();
            using (var db = new MedicalMonitoringDBEntities())
            {
                model.Accounts = db.AspNetUsers.Where(m => !m.EmailConfirmed).Select(s =>
                new UsersAccountsModel()
                {
                    Id = s.Id,
                    Email = s.Email,
                    Mobile = s.PhoneNumber,
                    Username = s.UserName
                }).ToList();
            }
            return View(model);
        }

        public ActionResult Approve(string usid)
        {
            using (var db = new MedicalMonitoringDBEntities())
            {
                var usr = db.AspNetUsers.FirstOrDefault(s => s.Id == usid);
                usr.EmailConfirmed = true;
                db.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        public ActionResult AssignPatients()
        {

            var model = new AssignPatientViewModel();
            using (var db = new MedicalMonitoringDBEntities())
            {
                model.patientList = db.AspNetRoles.FirstOrDefault(m => m.Name == "Patient")
                    .AspNetUsers
                    .Select(s =>
                new SelectListItem()
                {
                    Value = s.Id,
                    Text = s.UserName
                }).ToList();

                model.doctorList = db.AspNetRoles.FirstOrDefault(m => m.Name == "Doctor")
                    .AspNetUsers
                    .Where(m=>m.EmailConfirmed)
                    .Select(s =>
                 new SelectListItem()
                 {
                     Value = s.Id,
                     Text = s.UserName
                 }).ToList();
            }
            return View(model);
        }

        [HttpPost]
        public ActionResult AssignPatients(AssignPatientViewModel model)
        {

            return RedirectToAction("AssignPatients");
        }
    }
}