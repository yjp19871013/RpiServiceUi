import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, LoginResponse } from './login.model';
import { JwtService } from './jwt.service';
import { Router } from '@angular/router';

const USER_KEY = "user"

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private createTokenUrl: string = "/api/users/token";

  constructor(private jwtService: JwtService, private http: HttpClient, private router: Router) { }

  login(user: User): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.createTokenUrl, user);
  }

  logout() {
      this.jwtService.delete();
      this.router.navigateByUrl("/login");
  }

  getLoginUser(): User {
    if (!this.isLogin()) {
      this.logout();
      return null;
    }

    return this.jwtService.get().user;
  }

  getLoginToken(): string {
    if (!this.isLogin()) {
      this.logout();
      return "";
    }

    return this.jwtService.get().token;
  }

  isLogin(): boolean {
    return null != this.jwtService.get();
  }
}
