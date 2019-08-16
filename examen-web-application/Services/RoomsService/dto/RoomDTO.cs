using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.RoomsService.dto
{
    public class RoomDTO
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public RoomTypeDTO Type { get; set; }
        public double Price { get; set; }
        public string RoomNo { get; set; }
    }
}
