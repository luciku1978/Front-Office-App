using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace examen_web_application.Models
{
    public class UserPermission
    {
        
        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public int PermissionID { get; set; }
        [ForeignKey("PermissionID")]
        [Key]
        public int ID { get; set; }
    }
}
