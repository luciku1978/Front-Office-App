export class UserPermAdmDTO {
  userID: number;
  permissions: PermAdmDTO[] = [];
  userName: string;
}

export class PermAdmDTO {
  id: number;
  name: string;
  isAssigned: boolean;
}
