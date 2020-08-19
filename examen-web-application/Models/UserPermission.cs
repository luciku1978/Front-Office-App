using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace examen_web_application.Models
{
    public class UserPermission
    {
        [Key]
        public int ID { get; set; }
        public int UserID { get; set; }
        public int PermissionID { get; set; }
    }
}
