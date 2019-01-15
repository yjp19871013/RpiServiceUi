import { Component, OnInit } from '@angular/core';
import { User } from '../../login/login.model';
import { UserManageService } from './user-manage.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManageComponent implements OnInit {

  errMsg: string = "";
  roles: string[] = [];
  newUser: User = {
    email: "",
    password: "",
    roles: []
  };

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
  }

  ngOnInit() {
  }

  addNewUser() {

  }

  modifyUser(user: User) {

  }

  deleteUser(user: User) {

  }

  onRoleCheckChanged(role: string) {
    if (this.checkedRoles.includes(role)) {
      this.checkedRoles.splice(this.checkedRoles.findIndex(item => item === role), 1)
    } else {
      this.checkedRoles.push(role);
    }
  }

}
