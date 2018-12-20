import { Component, OnInit } from '@angular/core';
import { FileDownloadTask } from './file-download.model';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.css']
})
export class FileDownloadComponent implements OnInit {

  newTask: FileDownloadTask = {
    url: "",
    saveFilename: ""
  };

  private isShowComplete: boolean = false
  private isChooseAll: boolean = false

  constructor() { }

  ngOnInit() {
  }

  addDownloadTask() {
      console.log(this.newTask.url);
      console.log(this.newTask.saveFilename);
  }

  onChooseAll() {
    this.isChooseAll = !this.isChooseAll;
    console.log(this.isChooseAll);
  }

}
