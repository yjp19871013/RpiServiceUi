import { Component, OnInit } from '@angular/core';
import { NewFileDownloadTask, FileDownloadTask } from './file-download.model';
import { FileDownloadService } from './file-download.service';
import { Router } from '@angular/router';

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

  private progressTimer: number;

  constructor(private fileDownloadService: FileDownloadService,
    private router: Router) { }

  ngOnInit() {
    this.fileDownloadService.getAllDownloadTasks().subscribe(
      (response) => {
        this.tasks = response.tasks;
      },
      (err) => {
        if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else if (err.status == 401) {
          this.router.navigateByUrl("/login");
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });

    this.progressTimer = window.setInterval(() => {
      this.errMsg = "";

      if (this.tasks.length == 0) {
        return;
      }

      var ids: number[] = [];
      this.tasks.forEach((item, index) => {
        ids.push(item.id);
      });

      this.fileDownloadService.getProgress(ids).subscribe(
        (response) => {
          if (response.progresses.length == 0) {
            return;
          }

          response.progresses.forEach((item, index) => {
            var index = this.tasks.findIndex(value => {
              return value.id == item.id;
            });

            if (item.progress == 100) {
              this.tasks.splice(index, 1)
            } else {
              this.tasks[index].progress = item.progress;
            }
          });
        },
        (err) => {
          if (err.status == 400) {
            this.errMsg = "请求参数错误";
          } else if (err.status == 401) {
            this.router.navigateByUrl("/login");
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
        this.tasks.push(response);
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";
        } else if (err.status == 401) {
          this.router.navigateByUrl("/login");
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
        this.tasks.splice(this.tasks.findIndex(item => item.id === response.id), 1)
      },
      (err) => {
        if (err.status == 400) {
          this.errMsg = "请求参数错误";
        } else if (err.status == 401) {
          this.router.navigateByUrl("/login");
        } else if (err.status == 500) {
          this.errMsg = "服务器内部错误";
        } else {
          this.errMsg = "未知错误: " + err.status + err.error.message;
        }
      });
  }
}
