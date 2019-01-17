import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { GetAllRolesResponse, GetAllUsersResponse } from './user-manage.model';
import { UpdateUserRolesRequest } from './user-manage.model';

@Injectable({
  providedIn: 'root'
})
export class UserManageService {

  private getRolesUrl: string = "/api/users/roles";
  private getUsersUrl: string = "/api/users";
  private updateUserRolesUrl: string = "/api/users/roles";

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
    return this.http.get<GetAllUsersResponse>(this.getUsersUrl, this.authorizationHeaders);
  }

  updateUserRoles(request: UpdateUserRolesRequest): Observable<any> {
    return this.http.put<any>(this.updateUserRolesUrl, request, this.authorizationHeaders);
  }
}
