export class User {
  email: string;
  password: string;
  roles: string[];
}

export class LoginResponse {
  token: string;
  roles: string[];
}
