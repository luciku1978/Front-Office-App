using examen_web_application.Models;
using examen_web_application.Services.BookingService.dto;
using examen_web_application.Services.UserServ.Helpers;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.BookingService
{
    public interface IBookingService
    {
        List<BookingDTO> GetBookingsAdm(int loggedUserID);
        void UpsertBooking(BookingDTO dto, int loggedUserID);
        void UpsertBookingReception(BookingDTO bookingDTO, int loggedUserID);
    }
    public class BookingService: IBookingService
    {
        IUserPermissionHelper UserPermissionHelper;
        UsersDbContext DbContext;
        public BookingService(UsersDbContext usersDbContext,
            IUserPermissionHelper userPermissionHelper)
        {
            DbContext = usersDbContext;
            UserPermissionHelper = userPermissionHelper;
        }
        //doar client
        public IEnumerable<object> GetBookings(int roomID, int loggedUserID)
        {
            return DbContext.Booking.Where(x=> x.UserID == loggedUserID).Select(x=> new BookingDTO()
            {
                ID = x.Id,

            });
        }

        //doar adminul
        public List<BookingDTO> GetBookingsAdm(int loggedUserID)
        {
            if (!UserPermissionHelper.GetPermissions(loggedUserID).Contains(UserServ.Helpers.UserPermission.Enums.PermissionTypeEnum.CanAdmBookings))
                throw new Exception("Access denied");
            return DbContext.Booking.Select(x=> new BookingDTO()
            {
                ID = x.Id,
            }).ToList();
        }

        public void UpsertBooking(BookingDTO dto, int loggedUserID)
        {
            if(dto.ID > 0)
            {
                if (!DbContext.Booking.Any(x => x.Id == dto.ID && x.UserID == loggedUserID))
                    throw new Exception("Access denied");
            }

            dto.UserID = loggedUserID;
            _UpsertBooking(dto, loggedUserID);
        }

        public void UpsertBookingReception(BookingDTO bookingDTO, int loggedUserID)
        {
            if (!UserPermissionHelper.GetPermissions(loggedUserID).Contains(UserServ.Helpers.UserPermission.Enums.PermissionTypeEnum.CanAdmBookings))
                throw new Exception("Access denied");
            _UpsertBooking(bookingDTO, loggedUserID);
        }

        private void _UpsertBooking(BookingDTO bookingDTO, int loggedUserID)
        {
            var dbBooking = DbContext.Booking.FirstOrDefault(x => x.Id == bookingDTO.ID);
            var toAdd = false;
            var currDate = DateTime.Now;
            if (dbBooking == null)
            {
                dbBooking = new Booking()
                {
                    AddedOn = currDate,
                    RoomID = bookingDTO.RoomID,
                };
            }

            dbBooking.StartDate = bookingDTO.StartDate;
            dbBooking.UserID = bookingDTO.UserID;
            if (toAdd)
                DbContext.Booking.Add(dbBooking);
            DbContext.SaveChanges();
        }
    }
}
