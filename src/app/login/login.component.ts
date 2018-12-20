import { Component, OnInit } from '@angular/core';
import { User, LoginResponse } from './login.model';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { JwtService } from './jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User = {
    email: "",
    password: ""
  };

  errMsg: string = "";

  constructor(private loginService: LoginService,
    private jwtService: JwtService,
    private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.errMsg = "";

    if (this.user.email == "" || this.user.password == "") {
      this.errMsg = "邮箱或密码不能为空";
      return;
    }

    var emailPattern = /^[A-Za-z0-9\u4e00-\u9fa5.]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailPattern.test(this.user.email)) {
      this.errMsg = "邮箱格式不正确";
      return;
    }

    this.loginService.login(this.user)
      .subscribe(
        (response) => {
          this.errMsg = "";
          this.jwtService.save(response.token, this.user);
          this.router.navigateByUrl("/");
        },
        (err) => {
          if (err.status == 400) {
            this.errMsg = "请求参数错误";
          } else if (err.status == 401) {
            this.errMsg = "用户名或密码错误";
          } else if (err.status == 404) {
            this.errMsg = "用户不存在";
          } else if (err.status == 500) {
            this.errMsg = "服务器内部错误";
          } else {
            this.errMsg = "未知错误: " + err.status + err.error.message;
          }
        });
  }
}
