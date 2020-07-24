using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.BookingService.dto
{
    public class BookingDTO
    {
        public int ID { get; set; }
        public int RoomID { get;  set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public int UserID { get; set; }
    }
}
