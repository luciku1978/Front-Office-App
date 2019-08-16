using examen_web_application.Models;
using examen_web_application.Services.UserServ.adm.dto;
using examen_web_application.Services.UserServ.Helpers;
using examen_web_application.Services.UserServ.Helpers.UserPermission.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.UserServ
{
    public interface IUserPermissionAdmService
    {
        void AssignPermissions(UserPermAdmDTO user, int loggedUserID);
        IEnumerable<UserPermAdmDTO> GetPermissions(int loggedUserID);
    }
    public class UserPermissionAdmService : IUserPermissionAdmService
    {
        UsersDbContext DbContext;
        IUserPermissionHelper UserPermissionHelper;
        public UserPermissionAdmService(UsersDbContext dbContext, IUserPermissionHelper userPermissionHelper)
        {
            DbContext = dbContext;
            UserPermissionHelper = userPermissionHelper;
        }

        private void ValidateAccess(int loggedUserID)
        {
            if (!UserPermissionHelper.GetPermissions(loggedUserID).Contains(PermissionTypeEnum.CanUpsertPermissions))
                throw new Exception("Access denied");
        }

        public void AssignPermissions(UserPermAdmDTO user, int loggedUserID)
        {
            ValidateAccess(loggedUserID);
            if (!(user.UserID > 0))
                throw new Exception("Invalid user");

            using (var trans = DbContext.Database.BeginTransaction())
            {
                try
                {
                    var perms = DbContext.UserPermission.Where(x => x.UserID == user.UserID);
                    DbContext.UserPermission.RemoveRange(perms);
                    DbContext.SaveChanges();

                    foreach (var perm in user.Permissions)
                    {
                        if (perm.IsAssigned)
                            DbContext.UserPermission.Add(new UserPermission()
                            {
                                PermissionID = perm.ID,
                                UserID = user.UserID
                            });
                    }

                    DbContext.SaveChanges();
                    trans.Commit();
                }
                catch (Exception ex)
                {
                    trans.Rollback();
                    throw ex;
                }

            }

        }

        public IEnumerable<UserPermAdmDTO> GetPermissions(int loggedUserID)
        {
            ValidateAccess(loggedUserID);
            return (from x in DbContext.Users
                        //let perm =

                    select new UserPermAdmDTO()
                    {
                        UserID = x.Id,
                        UserName = x.Username,
                        Permissions = (from p in DbContext.Permission
                                       let pas = (from _pas in DbContext.UserPermission
                                                  where _pas.PermissionID == p.ID &&
                                                  _pas.UserID == x.Id
                                                  select _pas
                                                 ).FirstOrDefault()
                                       select new PermAdmDTO()
                                       {
                                           ID = p.ID,
                                           IsAssigned = pas != null,
                                           Name = p.Name
                                       }).ToList()
                    }
             ).ToList();
        }
    }
}
