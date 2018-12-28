import { Component, OnInit } from '@angular/core';
import { FileInfo } from './files.model';

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

  private isChooseAll: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  deleteFile(info: FileInfo) {

  }

  getFile(info: FileInfo) {

  }

  onChooseAll() {
    this.isChooseAll = !this.isChooseAll;
  }

}
