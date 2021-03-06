﻿using examen_web_application.Models;
using System;

namespace examen_web_application.Services.BookingService.dto
{
    public class BookingDTO
    {
        
        public int Id { get; internal set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public BookingRoomDTO Room { get; set; }
        public BookingUserDTO User { get; set; }
        public int RoomID { get; set; }
        public int UserID { get; set; }

        public int PersNumber { get; set; }
        public string BookingStatus { get; set; }

        public class BookingUserDTO
        {
            public int Id { get; set; }
            public string FirstName { get; set; }
            public string LastName { get; set; }
        }
        public class BookingRoomDTO
        {
            public int Id { get; set; }
            public string RoomNo { get; set; }
        }

        public static Booking Booking(BookingDTO book)
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
               
            };
        }
    }
}
