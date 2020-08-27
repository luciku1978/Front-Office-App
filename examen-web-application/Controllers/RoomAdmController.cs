using examen_web_application.Services;
using examen_web_application.Services.RoomsService;
using examen_web_application.Services.RoomsService.adm.dto;
using Microsoft.AspNetCore.Mvc;

namespace examen_web_application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RoomAdmController : BaseController
    {
        IRoomAdmService RoomAdmService;
        public RoomAdmController(IRoomAdmService roomAdmService, IUserService userService) : base(userService)
        {
            RoomAdmService = roomAdmService;
        }

        [Route("GetRooms")]
        [HttpGet]
        public IActionResult GetRooms()
        {
            return Ok(RoomAdmService.GetRooms(LoggedUserID));
        }

        [Route("UpsertRoom")]
        [HttpPost]
        public IActionResult UpsertRoom([FromBody] RoomAdmDTO room)
        {
            RoomAdmService.UpsertRoom(room, LoggedUserID);
            return Ok();
        }

    }
}