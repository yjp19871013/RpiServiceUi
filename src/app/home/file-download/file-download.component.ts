import { Component, OnInit } from '@angular/core';
import { NewFileDownloadTask, FileDownloadTask } from './file-download.model';
import { FileDownloadService } from './file-download.service';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  newTask: NewFileDownloadTask = {
    url: "",
    saveFilename: ""
  };

  tasks: FileDownloadTask[] = [];

  errMsg: string = ""

  private isShowComplete: boolean = false
  private isChooseAll: boolean = false

  constructor(private fileDownloadService: FileDownloadService) { }

  ngOnInit() {
  }

  addDownloadTask() {
    this.errMsg = "";
    
    this.fileDownloadService.addDownloadTask(this.newTask).subscribe(
      (response) => {
        this.tasks.push(response);
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";
        } else if (err.status == 401) {
          this.errMsg = "未登录";
        } else if (err.status == 409) {
          this.errMsg = "任务已存在";
        } else if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  onChooseAll() {
    this.isChooseAll = !this.isChooseAll;
    console.log(this.isChooseAll);
  }

}
