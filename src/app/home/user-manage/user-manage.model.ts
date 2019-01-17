import { User } from '../../login/login.model';

export class UserInfo {
  id: number;
  email: string;
  roles: string[];
  createDate: string;
  updateDate: string;
}

export class GetAllRolesResponse {
  roles: string[];
}

export class GetAllUsersResponse {
  userInfos: UserInfo[];
}

export class UpdateUserRolesRequest {
  id: number;
  roles: string[];
}
