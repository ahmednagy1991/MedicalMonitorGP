//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MedicalAdminWebApp.DBContext
{
    using System;
    using System.Collections.Generic;
    
    public partial class SensorsReading
    {
        public long Id { get; set; }
        public string FK_PatientId { get; set; }
        public Nullable<System.DateTime> ReadingDate { get; set; }
        public Nullable<double> Latitude { get; set; }
        public Nullable<double> Longitude { get; set; }
        public Nullable<double> HR { get; set; }
        public Nullable<double> Temprature { get; set; }
        public Nullable<int> SPO2 { get; set; }
        public Nullable<double> BS { get; set; }
    
        public virtual AspNetUser AspNetUser { get; set; }
    }
}
