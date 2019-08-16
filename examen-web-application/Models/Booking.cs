using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }       
        public int RoomID { get; set; }
        [ForeignKey("RoomID")]
        public Room Room { get; set; }
        public int UserID { get; set; }
        [ForeignKey("UserID")]
        public User User { get; set; }
        [EnumDataType(typeof(BookingStatusEnum))]
        public BookingStatusEnum BookingStatus { get; set; }
        public int PersNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime UpdatedOn { get; set; }
    }

    public enum BookingStatusEnum
    {
        Pending = 1,
        Approved = 2,
        Deleted = 3
    }
}
