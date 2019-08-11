using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using examen_web_application.Services.RoomsService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace examen_web_application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        IRoomService RoomService;
        public RoomsController(IRoomService roomService)
        {
            RoomService = roomService;
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
    }
}