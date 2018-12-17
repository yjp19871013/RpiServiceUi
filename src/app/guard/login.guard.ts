import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from '../jwt.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private router: Router, private jwtService: JwtService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    var hasLogin = this.checkLogin(state.url);
    if (!hasLogin) {
        this.router.navigateByUrl("/login")
        return false;
    }

    return true;
  }

  checkLogin(url: string): boolean {
    var jwt = this.jwtService.get();
    if ("" == jwt) {
        return false;
    }

    return true;
  }
}
