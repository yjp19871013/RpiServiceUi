import { Component, OnInit } from '@angular/core';
import { User } from '../../login/login.model';
import { UserManageService } from './user-manage.service';
import { UserInfo, UpdateUserRolesRequest } from './user-manage.model';
import { Router } from '@angular/router';
import { LoginService } from '../../login/login.service';

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

  editCache = {};
  userInfos: UserInfo[] = [];

  private checkedRoles: string[] = [];

  constructor(private userManageService: UserManageService,
    private loginService: LoginService,
    private router: Router) { }

  ngOnInit() {
    this.userManageService.getAllRoles().subscribe(
      (response) => {
        this.roles = response.roles;
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "获取角色列表失败，服务器内部错误";
        } else if (err.status == 401) {
          this.router.navigateByUrl("/login");
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });

    this.userManageService.getAllUsers().subscribe(
      (response) => {
        response.userInfos.forEach((item) => {
          var info: UserInfo = {
            id: item.id,
            email: item.email,
            roles: item.roles,
            createDate: item.createDate,
            updateDate: item.updateDate
          };

          this.userInfos.push(info);
          this.addToEditCache(info);
        });

        console.log(this.editCache);
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "获取用户列表失败，服务器内部错误";
        } else if (err.status == 401) {
          this.router.navigateByUrl("/login");
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  addToEditCache(info: UserInfo) {
    if (!this.editCache[info.id]) {
      this.editCache[info.id] = {
        edit: false,
        data: { ...info }
      };
    }
  }

  modifyUser(id: number) {
    this.editCache[id].edit = true;
  }

  saveModify(id: number) {
    var userInfo = this.userInfos[this.userInfos.findIndex((item) => item.id === id)];
    var editUserInfo = this.editCache[id];

    var request: UpdateUserRolesRequest = {
      id: editUserInfo.data.id,
      roles: editUserInfo.data.roles,
    };
    this.userManageService.updateUserRoles(request).subscribe(
      (response) => {
        if (this.loginService.getLoginUser().email == userInfo.email) {
          this.router.navigateByUrl("/login");
          return;
        }

        Object.assign(userInfo, this.editCache[id].data);
        this.editCache[id].edit = false;
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else if (err.status == 400) {
          this.errMsg = "传递参数错误";
        } else if (err.status == 401) {
          this.router.navigateByUrl("/login");
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  cancelModify(id: number) {
    this.editCache[id].edit = false;
  }

  deleteUser(id: number) {
    const dataSet = this.userInfos.filter(d => d.id !== id);
    this.userInfos = dataSet;
  }

  onRoleCheckChanged(value: string[]) {
    this.checkedRoles = value;
    console.log(this.checkedRoles);
  }

}
