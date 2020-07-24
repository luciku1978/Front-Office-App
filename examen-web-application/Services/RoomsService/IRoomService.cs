using examen_web_application.Services.RoomsService.dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.RoomsService
{
    public interface IRoomService
    {
        IEnumerable<RoomTypeDTO> GetCategories();
        byte[] GetImageForCategory(string image);
        IEnumerable<RoomDTO> GetRooms(int type);
        IEnumerable<RoomDTO> GetSelectableRooms(int loggedUserID);
    }
}
