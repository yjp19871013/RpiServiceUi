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
  private deleteUserUrl: string = "/api/users";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllRoles(): Observable<GetAllRolesResponse> {
    return this.http.get<GetAllRolesResponse>(this.getRolesUrl,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  getAllUsers(): Observable<GetAllUsersResponse> {
    return this.http.get<GetAllUsersResponse>(this.getUsersUrl,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  updateUserRoles(request: UpdateUserRolesRequest): Observable<any> {
    return this.http.put<any>(this.updateUserRolesUrl, request,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete<any>(this.deleteUserUrl + "/" + id,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }
}
