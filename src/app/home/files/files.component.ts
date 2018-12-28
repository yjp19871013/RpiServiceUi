import { Component, OnInit } from '@angular/core';
import { FileInfo } from './files.model';
import { FilesService } from './files.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css']
})
export class FilesComponent implements OnInit {

  fileInfos: FileInfo[] = [
      {
          fileName: "ubuntu.iso",
          completeDate: "2018-12-28 15:00:00",
          sizeKb: 124000
      }
  ];

  errMsg: string = ""

  private isChooseAll: boolean = false;

  constructor(private filesService: FilesService, private router: Router) { }

  ngOnInit() {
      this.filesService.getFileInfos().subscribe(
        (response) => {
          this.fileInfos = response.fileInfos;
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
  }

  deleteFile(info: FileInfo) {

  }

  getFile(info: FileInfo) {

  }

  onChooseAll() {
    this.isChooseAll = !this.isChooseAll;
  }

}
