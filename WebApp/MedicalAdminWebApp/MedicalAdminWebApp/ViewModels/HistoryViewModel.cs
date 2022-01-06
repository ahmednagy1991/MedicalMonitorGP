using MedicalAdminWebApp.DBContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace MedicalAdminWebApp.ViewModels
{
    public class HistoryViewModel
    {
        public List<SensorsReading> readingList { get; set; }
    }
}