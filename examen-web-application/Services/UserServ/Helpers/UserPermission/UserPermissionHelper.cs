using examen_web_application.Models;
using examen_web_application.Services.UserServ.Helpers.UserPermission.Enums;
using System.Collections.Generic;
using System.Linq;

namespace examen_web_application.Services.UserServ.Helpers
{
    public interface IUserPermissionHelper {
        IEnumerable<PermissionTypeEnum> GetPermissions(int loggedUserID);
    }
    public class UserPermissionHelper: IUserPermissionHelper
    {
        UsersDbContext DbContext;
        public UserPermissionHelper(UsersDbContext context)
        {
            DbContext = context;
        }

        public IEnumerable<PermissionTypeEnum> GetPermissions(int loggedUserID)
        {
           return DbContext.UserPermission.Where(x => x.UserID == loggedUserID).Select(x => (PermissionTypeEnum)x.PermissionID);
            //return DbContext.Users.
        }
    }
}
