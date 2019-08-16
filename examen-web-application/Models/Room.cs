using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Models
{


    public class Room
    {
        [Key]
        public int Id { get; set; }
        public string Description { get; set; }
        public int RoomTypeID { get; set; }
        [ForeignKey("RoomTypeID")]
        public RoomType RoomType { get; set; }
        public string Image { get; set; }
        public double Price { get; set; }
        public string RoomNo { get; set; }
        public Boolean Available { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }
}
