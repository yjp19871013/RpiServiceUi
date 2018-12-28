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

  homePageUrl = "/file-download"

  items: NavbarItem[] = [
    {
      title: "文件管理", link: "#", children: [
        { title: "文件下载", link: "/file-download", children: null },
        { title: "我的文件", link: "/files", children: null }
      ]
    },
  ];

  user: User;

  constructor(private router: Router, private loginService: LoginService) {
    this.user = this.loginService.getLoginUser();
  }

  ngOnInit() {
  }

  logout() {
    this.loginService.logout();
    this.router.navigateByUrl("/login");
  }

}
