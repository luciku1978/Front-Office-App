using System.ComponentModel.DataAnnotations;

namespace examen_web_application.Models
{
    public class Permission
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
    }
}
