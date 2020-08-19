using System;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace examen_web_application.Models
{
    public class Booking
    {
        [Key]
        public int Id { get; set; }       
        public int RoomID { get; set; }
        [ForeignKey("RoomID")]
        public int UserID { get; set; }
        [ForeignKey("UserID")]
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
        [Description("New")]
        New,
        [Description("Pending")]
        Pending,
        [Description("Confirmed")]
        Confirmed,
        [Description("Canceled")]
        Canceled
    }
}
