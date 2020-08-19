using examen_web_application.Models;
using System;

namespace examen_web_application.Viewmodels
{
    public class BookingPostModel
    {
        public int Id { get; set; }
        public int RoomID { get; set; }
        public int UserID { get; set; }
        public string BookingStatus { get; set; }
        public int PersNumber { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime AddedOn { get; set; }
        public DateTime UpdatedOn { get; set; }

        public static Booking Booking(BookingPostModel book)
        {
            BookingStatusEnum status = Models.BookingStatusEnum.New;

            if (book.BookingStatus == "")
            {
                status = Models.BookingStatusEnum.New;
            }
            else if (book.BookingStatus == "Confirmed")
            {
                status = Models.BookingStatusEnum.Confirmed;
            }
            else if (book.BookingStatus == "Pending")
            {
                status = Models.BookingStatusEnum.Pending;
            }
            else
            {
                status = Models.BookingStatusEnum.Canceled;
            }

            return new Booking
            {
                RoomID = book.RoomID,
                UserID = book.UserID,
                BookingStatus = status,
                PersNumber = book.PersNumber,
                StartDate = book.StartDate,
                EndDate = book.EndDate,
                AddedOn = book.AddedOn,
                UpdatedOn = book.UpdatedOn
            };
        }
    }

   
}
