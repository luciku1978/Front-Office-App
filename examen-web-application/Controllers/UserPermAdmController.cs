using examen_web_application.Services;
using examen_web_application.Services.UserServ;
using examen_web_application.Services.UserServ.adm.dto;
using Microsoft.AspNetCore.Mvc;

namespace examen_web_application.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserPermAdmController : BaseController
    {
        IUserPermissionAdmService UserPermissionAdmService;
        public UserPermAdmController(IUserPermissionAdmService userPermissionAdmService, IUserService usersService) : base(usersService)
        {

            UserPermissionAdmService = userPermissionAdmService;

        }

        [HttpGet]
        [Route("GetPermissions")]
        public IActionResult GetPermissions()
        {
            return Ok(UserPermissionAdmService.GetPermissions(LoggedUserID));
        }

        [HttpPost]
        [Route("AssignPermissions")]
        public IActionResult AssignPermissions([FromBody] UserPermAdmDTO perms)
        {
            UserPermissionAdmService.AssignPermissions(perms, LoggedUserID);
            return Ok();
        }
    }
}