import { User } from '../../login/login.model';

export class UserInfo {
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
