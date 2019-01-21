import { Component, OnInit } from '@angular/core';
import { NewFileDownloadTask, FileDownloadTask } from './file-download.model';
import { FileDownloadService } from './file-download.service';
import { LoginService } from '../../login/login.service';

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

  tasks: FileDownloadTask[] = null;

  errMsg: string = ""

  private progressTimer: number;

  constructor(private fileDownloadService: FileDownloadService,
    private loginService: LoginService) { }

  ngOnInit() {
    this.fileDownloadService.getAllDownloadTasks().subscribe(
      (response) => {
        this.tasks = response.tasks;
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

    this.progressTimer = window.setInterval(() => {
      this.errMsg = "";

      if (this.tasks.length == 0) {
        return;
      }

      const ids: number[] = [];
      this.tasks.forEach((item, index) => {
        ids.push(item.id);
      });

      this.fileDownloadService.getProgress(ids).subscribe(
        (response) => {
          if (response.progresses.length == 0) {
            return;
          }

          response.progresses.forEach((item) => {
            const index = this.tasks.findIndex(value => {
              return value.id == item.id;
            });

            if (item.progress == 100) {
              const dataSet = this.tasks.filter(d => d.id !== item.id);
              this.tasks = dataSet;
            } else {
              this.tasks[index].progress = item.progress;
            }
          });
        },
        (err) => {
          if (err.status == 400) {
            this.errMsg = "请求参数错误";
          } else if (err.status == 401) {
            this.loginService.logout();
          } else if (err.status == 500) {
            this.errMsg = "服务器内部错误";
          } else {
            this.errMsg = "未知错误: " + err.status + err.error.message;
          }
        });
    }, 5000);
  }

  ngOnDestory() {
    window.clearInterval(this.progressTimer);
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

        response.progress = 0;

        // 触发刷新数据集
        const tasks: FileDownloadTask[] = [...this.tasks];
        tasks.push(response);
        this.tasks = tasks;
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";
        } else if (err.status == 401) {
          this.loginService.logout();
        } else if (err.status == 409) {
          this.errMsg = "已存在";
        } else if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }

  deleteDownloadTask(task: FileDownloadTask) {
    this.errMsg = "";

    this.fileDownloadService.deleteDownloadTask(task.id).subscribe(
      (response) => {
        const dataSet = this.tasks.filter(d => d.id !== task.id);
        this.tasks = dataSet;
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";
        } else if (err.status == 401) {
          this.loginService.logout();
        } else if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }
}
