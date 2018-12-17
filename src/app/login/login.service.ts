import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginResponse } from './login.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private createTokenUrl: string = "/api/users/token";

  constructor(private http: HttpClient) { }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.createTokenUrl, user);
  }
}
