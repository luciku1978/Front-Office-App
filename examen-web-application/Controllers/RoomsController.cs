using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using examen_web_application.Services;
using examen_web_application.Services.RoomsService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace examen_web_application.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : BaseController
    {
        IRoomService RoomService;
        public RoomsController(IRoomService roomService, IUserService userService):base(userService)
        {
            RoomService = roomService;
        }

        [Route("GetRooms")]
        [HttpGet]
        public IActionResult GetRooms(int type)
        {
            return Ok(RoomService.GetRooms(type));
        }

        [Route("GetCategories")]
        [HttpGet]
        public IActionResult GetCategories()
        {
            return Ok(RoomService.GetCategories());
        }

        [Route("GetImageForCategory")]
        [HttpGet]
        public IActionResult GetImageForCategory([FromQuery] string image)
        {
            return File(RoomService.GetImageForCategory(image), "image/png");
            //return Ok(RoomService.GetImageForCategory(categoryID, image, Logged);
        }

        [Route("GetSelectableRooms")]
        [HttpGet]
        public IActionResult GetSelectableRooms()
        {
            return Ok(RoomService.GetSelectableRooms(LoggedUserID));
        }
    }
}