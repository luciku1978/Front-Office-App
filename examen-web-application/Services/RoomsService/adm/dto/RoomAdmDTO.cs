using examen_web_application.Services.RoomsService.dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.RoomsService.adm.dto
{
    public class RoomAdmDTO
    {
        public int ID { get; set; }
        public string Description { get; set; }
        public bool Available { get; set; }
        public double Price { get; set; }
        public RoomTypeDTO Type { get; set; }
        public string RoomNo { get; set; }
    }

}
