import { Component, OnInit } from '@angular/core';
import { FileInfo } from './files.model';
import { FilesService } from './files.service';
import { LoginService } from '../../login/login.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  fileInfos: FileInfo[] = null;

  errMsg: string = ""

  constructor(private loginService: LoginService, private filesService: FilesService) { }

  ngOnInit() {
    this.filesService.getFileInfos().subscribe(
      (response) => {
        this.fileInfos = response.fileInfos;
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else if (err.status == 401) {
          this.loginService.logout();
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  deleteFile(info: FileInfo) {
    this.filesService.deleteFile(info.id).subscribe(
      (response) => {
        const dataSet = this.fileInfos.filter(d => d.id !== info.id);
        this.fileInfos = dataSet;
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else if (err.status == 400) {
          this.errMsg = "参数错误";
        } else if (err.status == 401) {
          this.loginService.logout();
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  downloadFile(info: FileInfo) {
    this.filesService.downloadFile(info.id).subscribe(
      (response) => {
        location.href = response.staticUrl;
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else if (err.status == 400) {
          this.errMsg = "参数错误";
        } else if (err.status == 401) {
          this.loginService.logout();
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  deleteAllFiles() {
    this.fileInfos.forEach((item, index) => {
      this.deleteFile(item);
    });
  }

}
