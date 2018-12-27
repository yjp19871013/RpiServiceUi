import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service';
import {
  NewFileDownloadTask, FileDownloadTask,
  DeleteFileDownloadTaskResponse, GetAllDownloadTasksResponse,
  GetDownloadProgressResponse
} from './file-download.model';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  private getAllDownloadTasksUrl: string = "/api/file-station/download-proxy/tasks";
  private addDownloadTaskUrl: string = "/api/file-station/download-proxy/tasks";
  private deleteDownloadTaskUrl: string = "/api/file-station/download-proxy/tasks";
  private getProgressUrl: string = "/api/file-station/download-proxy/tasks/download-progresses";

  private authorizationHeaders = {
    headers: new HttpHeaders({
      'Authorization': this.loginService.getLoginToken()
    })
  };

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getAllDownloadTasks(): Observable<GetAllDownloadTasksResponse> {
    return this.http.get<GetAllDownloadTasksResponse>(this.getAllDownloadTasksUrl, this.authorizationHeaders);
  }

  addDownloadTask(newTask: NewFileDownloadTask): Observable<FileDownloadTask> {
    return this.http.post<FileDownloadTask>(this.addDownloadTaskUrl, newTask, this.authorizationHeaders);
  }

  deleteDownloadTask(id: number): Observable<DeleteFileDownloadTaskResponse> {
    return this.http.delete<DeleteFileDownloadTaskResponse>(this.deleteDownloadTaskUrl + "/" + id, this.authorizationHeaders);
  }

  getProgress(ids: number[]): Observable<GetDownloadProgressResponse> {
    var params = "";
    ids.forEach((item, index) => {
      params = params + item + ";";
    });

    return this.http.get<GetDownloadProgressResponse>(this.getProgressUrl + "/" + escape(params.substring(0, params.length - 1)), this.authorizationHeaders);
  }
}
