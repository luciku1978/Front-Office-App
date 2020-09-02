using examen_web_application.Models;
using examen_web_application.Services.BookingService.dto;
using examen_web_application.Services.UserServ.Helpers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using static examen_web_application.Services.BookingService.dto.BookingDTO;

namespace examen_web_application.Services.BookingService
{
    public interface IBookingService
    {
        List<BookingDTO> GetBookingsAdm(int loggedUserID);
        void UpsertBooking(Booking dto, int loggedUserID);
        //Models.Booking UpsertBooking(Booking dto, int loggedUserID);
        void UpsertBookingReception(Booking bookingDTO, int loggedUserID);
        //Models.Booking UpsertBookingReception(Booking bookingDTO, int loggedUserID);
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
                Id = x.Id,

            });
        }

        //doar adminul
        public List<BookingDTO> GetBookingsAdm(int loggedUserID)
        {
            if (!UserPermissionHelper.GetPermissions(loggedUserID).Contains(UserServ.Helpers.UserPermission.Enums.PermissionTypeEnum.CanAdmBookings))
                throw new Exception("Access denied");
            return DbContext.Booking.Select(x => new BookingDTO()
            {

                Id = x.Id,
                User = (from u in DbContext.Users
                        where u.Id == x.UserID
                        select new BookingUserDTO()
                        {
                            Id = u.Id,
                            FirstName = u.FirstName,
                            LastName= u.LastName
                        }
                        ).FirstOrDefault(),
            Room = (from r in DbContext.Room
                    where r.Id == x.RoomID
                    select new BookingRoomDTO()
                    {
                        Id = r.Id,
                        RoomNo = r.RoomNo
                    }
                        ).FirstOrDefault(),
            UserID = x.UserID,
            RoomID = x.RoomID,
            StartDate = x.StartDate,
            EndDate = x.EndDate,
           BookingStatus = x.BookingStatus.ToString(),
           PersNumber = x.PersNumber,
        }).ToList();
        }
       

        public void UpsertBooking(Booking dto, int loggedUserID)
        {
            if(dto.Id > 0)
            {
                if (!DbContext.Booking.Any(x => x.Id == dto.Id && x.UserID == loggedUserID))
                    throw new Exception("Access denied");
            }

            dto.UserID = loggedUserID;
            //return 
            _UpsertBooking(dto, loggedUserID);
        }

        public void UpsertBookingReception(Booking bookingDTO, int loggedUserID)
        {
           
           //return 
           _UpsertBooking(bookingDTO, loggedUserID);
        }

        private void _UpsertBooking(Booking booking, int loggedUserID)
        {
                var dbBooking = DbContext.Booking.FirstOrDefault(x => x.Id == booking.Id);

            var roomId = DbContext.Room.FirstOrDefault(x => x.Id == booking.RoomID).Id;
            var userId = DbContext.Users.FirstOrDefault(x => x.Id == booking.UserID).Id;

            var currDate = DateTime.Now;


            //overbooking logic
      
            var overbooking = DbContext.Booking.FirstOrDefault(x =>x.Id != booking.Id && x.RoomID == booking.RoomID && !(x.StartDate >= booking.EndDate || x.EndDate <= booking.StartDate) && x.BookingStatus != BookingStatusEnum.Canceled);
            if (overbooking != null)
            {
                throw new Exception("Overbooking error");
                //return null;
                
            }
            // overbooking logic end
            if (dbBooking == null)
            {
                dbBooking = new Booking();
                dbBooking.AddedOn = currDate;
                dbBooking.UserID = userId;
                dbBooking.RoomID = roomId;
                dbBooking.StartDate = booking.StartDate.AddHours(3);
                dbBooking.EndDate = booking.EndDate.AddHours(3);
                dbBooking.BookingStatus = BookingStatusEnum.New;
                dbBooking.PersNumber = booking.PersNumber;
                dbBooking.UpdatedOn = currDate;

                

                DbContext.Booking.Add(dbBooking);

            }
            else
            {
                dbBooking.UserID = userId;
                dbBooking.RoomID = roomId;
                dbBooking.StartDate = booking.StartDate.AddHours(3);
                dbBooking.EndDate = booking.EndDate.AddHours(3);
                dbBooking.BookingStatus = booking.BookingStatus;
                dbBooking.PersNumber = booking.PersNumber;
                dbBooking.UpdatedOn = currDate;
                dbBooking.Id = booking.Id;

                DbContext.Booking.Update(dbBooking);
            }
          
            Console.WriteLine(dbBooking);
            DbContext.SaveChanges();
            //return dbBooking;
        }
    }
}
