using examen_web_application.Services.RoomsService.dto;
using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.RoomsService
{
    public class RoomsService: IRoomService
    {
        IHostingEnvironment HostingEnvironment;
        public RoomsService(IHostingEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        public IEnumerable<RoomCategoryDTO> GetCategories()
        {
            return new List<RoomCategoryDTO>()
            {
                new RoomCategoryDTO()
                {
                    Type = 1,
                    ImgSrc = "single.png",
                    Name = "Single"
                },
                   new RoomCategoryDTO()
                {
                    Type = 2,
                    ImgSrc = "double.png",
                    Name = "Double"
                },
                      new RoomCategoryDTO()
                {
                    Type = 1,
                    ImgSrc = "suite.png",
                    Name = "Suite"
                }
            };
        }

        public byte[] GetImageForCategory(string image)
        {
            var path = HostingEnvironment.ContentRootPath;
            path = Path.Combine(path, "Resources", "images", image);
            return File.ReadAllBytes(path);
        }

        public IEnumerable<RoomDTO> GetRooms(int categoryID)
        {
            return null;
        }

        public IEnumerable<RoomDTO> GetRooms()
        {
            //all;
            return null;
        }

    }
}
