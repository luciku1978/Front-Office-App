using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Models
{
    public enum UserRole
    {
        [Description("Regular")]
        Regular,
        [Description("Moderator")]
        Moderator,
        [Description("Admin")]
        Admin,
    }

    public class User
    {
        [Key]
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        [EnumDataType(typeof(UserRole))]
        public UserRole UserRole { get; set; }
        public DateTime CreatedAt{ get; set; }
       
    }
}
