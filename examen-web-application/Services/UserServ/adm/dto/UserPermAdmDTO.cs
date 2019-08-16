using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace examen_web_application.Services.UserServ.adm.dto
{
    public class UserPermAdmDTO
    {
        public int UserID { get; set; }
        public IEnumerable<PermAdmDTO> Permissions { get; set; } = new List<PermAdmDTO>();
        public string UserName { get; internal set; }
    }

    public class PermAdmDTO
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public bool IsAssigned { get; set; }
    }
}
