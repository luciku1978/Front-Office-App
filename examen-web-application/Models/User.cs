using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace examen_web_application.Models
{
    public enum UserRole
    {
        [Description("Client")]
        Client,
        [Description("FOStaff")]
        FOStaff,
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

        //public static implicit operator User(int v)
        //{
         //   throw new NotImplementedException();
       // }
    }
}
