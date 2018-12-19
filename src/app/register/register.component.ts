import { Component, OnInit } from '@angular/core';
import { ValidateCodeResquest, RegisterRequest } from './register.model';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerRequest: RegisterRequest = {
    email: "",
    password1: "",
    password2: "",
    validateCode: ""
  };

  errMsg = "";

  constructor(private registerService: RegisterService,
    private router: Router) { }

  ngOnInit() {
  }

  getValidateCode() {
    this.errMsg = "";

    if (this.registerRequest.email == "") {
      this.errMsg = "邮箱为空，无法获取";
      return;
    }

    this.registerService.generateValidateCode({
      email: this.registerRequest.email
    }).subscribe(
      (response) => {
        this.errMsg = "验证码已发送";
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";;
        } else if (err.status == 409) {
          this.errMsg = "该用户已存在";
        } else if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + " " + err.error.message;
        }
      });
  }

  register() {
    this.errMsg = "";

    if (this.registerRequest.email == ""
      || this.registerRequest.password1 == ""
      || this.registerRequest.password2 == "") {
      this.errMsg = "邮箱或密码不能为空";
      return;
    }

    var emailPattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailPattern.test(this.registerRequest.email)) {
      this.errMsg = "邮箱格式不正确";
      return;
    }

    if (this.registerRequest.password1 != this.registerRequest.password2) {
      this.errMsg = "确认密码不一致";
      return;
    }

    if (this.registerRequest.validateCode == "") {
      this.errMsg = "验证码为空";
      return;
    }

    this.registerService.register(this.registerRequest).subscribe(
      (response) => {
        this.errMsg = "";
        this.router.navigateByUrl("/login");
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";
        } else if (err.status == 404) {
          this.errMsg = "验证码错误";
        } else if (err.status == 406) {
          this.errMsg = "确认密码不一致";
        } else if (err.status == 409) {
          this.errMsg = "验证码已发送过";
        } else if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

}
