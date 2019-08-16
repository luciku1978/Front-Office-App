using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Models
{
    public class RoomType
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
    }

    public enum RoomTypeEnum
    {
        Single = 1,
        Double = 2,
        Suite = 3
    }
}
