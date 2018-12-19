import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginResponse } from './login.model';
import { JwtService } from './jwt.service';

const USER_KEY = "user"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private createTokenUrl: string = "/api/users/token";

  constructor(private jwtService: JwtService, private http: HttpClient) { }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.createTokenUrl, user);
  }

  logout() {
    this.jwtService.delete();
  }

  getLoginUser(): User {
    return this.jwtService.get().user;
  }

  isLogin(): boolean {
    return null != this.jwtService.get();
  }
}
