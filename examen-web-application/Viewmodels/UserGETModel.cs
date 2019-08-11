using examen_web_application.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Viewmodels
{
    public class UserGetModel
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string UserRole { get; set; }
        public string Token { get; set; }
    }
}
