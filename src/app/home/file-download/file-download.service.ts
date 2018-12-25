import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NewFileDownloadTask, FileDownloadTask } from './file-download.model';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  private addDownloadTaskUrl: string = "/api/file-station/download-proxy/files";

  constructor(private http: HttpClient) { }

  addDownloadTask(newTask: NewFileDownloadTask): Observable<FileDownloadTask> {
    return this.http.post<FileDownloadTask>(this.addDownloadTaskUrl, newTask);
  }
}
