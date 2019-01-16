import { Component, OnInit } from '@angular/core';
import { User } from '../../login/login.model';
import { UserManageService } from './user-manage.service';
import { UserInfo } from './user-manage.model';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  noDataStr: string = "没有更多数据了";

  errMsg: string = "";

  roles: string[] = [];

  newUser: User = {
    email: "",
    password: "",
    roles: []
  };

  userInfos: UserInfo[] = [];

  private checkedRoles: string[] = [];

  constructor(private userManageService: UserManageService) {
    this.userManageService.getAllRoles().subscribe(
      (response) => {
        this.roles = response.roles;
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "获取角色列表失败，服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });

    this.userManageService.getAllUsers().subscribe(
      (response) => {
        response.userInfos.forEach((item, index) => {
          var info: UserInfo = {
            key: '' + index + 1,
            email: item.email,
            roles: item.roles,
            createDate: item.createDate,
            updateDate: item.updateDate
          };
          this.userInfos.push(info);
        });
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "获取用户列表失败，服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  ngOnInit() {
  }

  addNewUser() {

  }

  modifyUser(key: string) {

  }

  deleteUser(key: string) {
    const dataSet = this.userInfos.filter(d => d.key !== key);
    this.userInfos = dataSet;
  }

  onRoleCheckChanged(value: string[]) {
    this.checkedRoles = value;
    console.log(this.checkedRoles);
  }

}
