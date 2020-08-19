using examen_web_application.Services;
using Microsoft.AspNetCore.Mvc;

namespace examen_web_application.Controllers
{
    [ApiController]
    public class BaseController : ControllerBase
    {
        IUserService UsersService;
        public BaseController(IUserService usersService)
        {
            UsersService = usersService;
        }

        protected int LoggedUserID
        {
            get
            {
                return UsersService.GetCurrentUser(HttpContext).Id;
            }
        }
    }
}