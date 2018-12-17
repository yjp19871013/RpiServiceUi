import { Component, OnInit } from '@angular/core';
import { User, LoginResponse } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    username: "",
    password: ""
  };

  errMsg: string = "";

  constructor(private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.loginService.login(this.user)
      .subscribe(
        (response) => {
          this.errMsg = "";
          this.jwtService.save(response.token);
          this.router.navigateByUrl("/")
        },
        (err) => {
          if (err.status == 400) {
            this.errMsg = "参数错误";
          } else if (err.status == 401) {
            this.errMsg = "用户名或密码错误";
          } else if (err.status == 500) {
            this.errMsg = "服务器内部错误";
          } else {
            this.errMsg = "未知错误: " + err.error.message;
          }
        });
  }
}