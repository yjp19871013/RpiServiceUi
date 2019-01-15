import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { GetAllRolesResponse, GetAllUsersResponse } from './user-manage.model';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  private getRolesUrl: string = "/api/users/roles";
  private geUsersUrl: string = "/api/users";

  private authorizationHeaders = {
    headers: new HttpHeaders({
      'Authorization': this.loginService.getLoginToken()
    })
  };

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllRoles(): Observable<GetAllRolesResponse> {
    return this.http.get<GetAllRolesResponse>(this.getRolesUrl, this.authorizationHeaders);
  }

  getAllUsers(): Observable<GetAllUsersResponse> {
    return this.http.get<GetAllUsersResponse>(this.geUsersUrl, this.authorizationHeaders);
  }
}