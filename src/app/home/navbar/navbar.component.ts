import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarItem } from './navbar.model';
import { LoginService } from '../../login/login.service';
import { User } from '../../login/login.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  items: NavbarItem[] = [
    { title: "文件管理", link: "/file-manage" }
  ];

  selectedItem = this.items[0];

  user: User;

  constructor(private router: Router, private loginService: LoginService) {
      this.user = this.loginService.getLoginUser();
  }

  ngOnInit() {
  }

  selected(item: NavbarItem) {
    this.selectedItem = item;
  }

  logout() {
      this.loginService.logout();
      this.router.navigateByUrl("/login");
  }

}
