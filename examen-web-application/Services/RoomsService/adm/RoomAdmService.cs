using examen_web_application.Models;
using examen_web_application.Services.RoomsService.adm.dto;
using examen_web_application.Services.UserServ.Helpers;
using examen_web_application.Services.UserServ.Helpers.UserPermission.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.RoomsService
{
    public interface IRoomAdmService
    {
        IEnumerable<RoomAdmDTO> GetRooms(int loggedUserID);
        void UpsertRoom(RoomAdmDTO room, int loggedUserID);
    }
    public class RoomAdmService : IRoomAdmService
    {
        UsersDbContext DbContext;
        IUserPermissionHelper UserPermissionHelper;
        public RoomAdmService(UsersDbContext dbContext, IUserPermissionHelper userPermissionHelper)
        {
            DbContext = dbContext;
            UserPermissionHelper = userPermissionHelper;
        }

        private void ValidateAccess(int loggedUserID)
        {
            if (!UserPermissionHelper.GetPermissions(loggedUserID).Contains(PermissionTypeEnum.CanUpsertRoom))
                throw new Exception("Access denied");
        }

        public IEnumerable<RoomAdmDTO> GetRooms(int loggedUserID)
        {
            ValidateAccess(loggedUserID);
            return (from x in DbContext.Room
                    join rt in DbContext.RoomType on x.RoomTypeID equals rt.ID
                    select new RoomAdmDTO()
                    {
                        ID = x.Id,
                        Description = x.Description,
                        Available = x.Available,
                        Price = x.Price,
                        Type = new dto.RoomTypeDTO()
                        {
                            ID = rt.ID,
                            Name = rt.Name
                        },
                        RoomNo = x.RoomNo
                    }).ToList();
        }

        public void UpsertRoom(RoomAdmDTO room, int loggedUserID)
        {
            ValidateAccess(loggedUserID);
            if (room.Type == null)
                throw new Exception("Invalid room type");
            var dbRoom = DbContext.Room.FirstOrDefault(x => x.Id == room.ID);
            var currDate = DateTime.Now;
            var toAdd = false;
            if (dbRoom == null)
            {
                toAdd = true;
                dbRoom = new Room();
                dbRoom.AddedOn = currDate;
            }

            dbRoom.Price = room.Price;
            dbRoom.RoomNo = room.RoomNo;
            dbRoom.RoomTypeID = room.Type.ID;
            dbRoom.Description = room.Description;
            dbRoom.Available = room.Available;
            dbRoom.UpdatedOn = currDate;
            if (toAdd)
                DbContext.Room.Add(dbRoom);
            DbContext.SaveChanges();
        }
    }
}
