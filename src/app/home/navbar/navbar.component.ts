import { Component, OnInit, Input } from '@angular/core';
import { NavbarItem } from './navbar.model';
import { LoginService } from '../../login/login.service';
import { User } from '../../login/login.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: User;

  constructor(private loginService: LoginService) {
    this.user = this.loginService.getLoginUser();
  }

  ngOnInit() {
  }

  canShowUserManage(): boolean {
    return this.loginService.isAdminRole(this.user.roles);
  }

  logout() {
      this.loginService.logout();
  }
}
