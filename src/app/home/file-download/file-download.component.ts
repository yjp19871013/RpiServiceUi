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
    this.fileDownloadService.getAllDownloadTasks().subscribe(
      (response) => {
        response.tasks.forEach((item, index) => {
          this.tasks.push(item);
        });
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  addDownloadTask() {
    this.errMsg = "";

    if (this.newTask.url == "") {
      this.errMsg = "URL不能为空";
      return;
    }

    this.fileDownloadService.addDownloadTask(this.newTask).subscribe(
      (response) => {
        this.newTask.url = "";
        this.newTask.saveFilename = "";
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

  deleteAllDownloadTask() {
      this.errMsg = "";

      this.tasks.forEach((item, index) => {
         this.deleteDownloadTask(item);
      });
  }

  deleteDownloadTask(task: FileDownloadTask) {
    this.errMsg = "";

    this.fileDownloadService.deleteDownloadTask(task.id).subscribe(
      (response) => {
        this.tasks.splice(this.tasks.findIndex(item => item.id === response.id), 1)

        if (this.tasks.length == 0) {
          this.isChooseAll = false;
        }
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";
        } else if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  onChooseAll() {
    this.isChooseAll = !this.isChooseAll;
  }
}
