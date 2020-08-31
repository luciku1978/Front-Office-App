using examen_web_application.Models;
using examen_web_application.Services.RoomsService.dto;
using Microsoft.AspNetCore.Hosting;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace examen_web_application.Services.RoomsService
{
    public class RoomsService: IRoomService
    {
        IHostingEnvironment HostingEnvironment;
        UsersDbContext DbContext;
        public RoomsService(IHostingEnvironment hostingEnvironment, UsersDbContext dbContext)
        {
            HostingEnvironment = hostingEnvironment;
            DbContext = dbContext;
        }

        public IEnumerable<RoomTypeDTO> GetCategories()
        {
            return DbContext.RoomType.Select(x => new RoomTypeDTO()
            {
                ID = x.ID,
                Name = x.Name,
                
            });
        }

        public byte[] GetImageForCategory(string image)
        {
            var path = HostingEnvironment.ContentRootPath;
            path = Path.Combine(path, "Resources", "Images", image);
            return File.ReadAllBytes(path);
        }

        public IEnumerable<RoomDTO> GetRooms(int type)
        {
            return (from x in DbContext.Room
                    join rt in DbContext.RoomType on x.RoomTypeID equals rt.ID
                    where x.RoomTypeID == type
                    select new RoomDTO()
                    {
                        ID = x.Id,
                        Description = x.Description,
                        RoomNo = x.RoomNo,
                        Available = x.Available,
                        Price = x.Price,
                        
                        Type = new RoomTypeDTO()
                        {
                            ID = rt.ID,
                            Name = rt.Name
                        }
                    }).ToList();
        }

        public IEnumerable<RoomDTO> GetRooms()
        {
            //all;
            return null;
        }

        public IEnumerable<RoomDTO> GetSelectableRooms(int loggedUserID)
        {
            return DbContext.Room.Select(x => new RoomDTO()
            {
                ID = x.Id,
                RoomNo = x.RoomNo
            }).ToList();
        }
    }
}
