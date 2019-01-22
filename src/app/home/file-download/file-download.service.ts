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
    return this.http.get<GetAllDownloadTasksResponse>(this.getAllDownloadTasksUrl,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  addDownloadTask(newTask: NewFileDownloadTask): Observable<FileDownloadTask> {
    return this.http.post<FileDownloadTask>(this.addDownloadTaskUrl, newTask,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  deleteDownloadTask(id: number): Observable<DeleteFileDownloadTaskResponse> {
    return this.http.delete<DeleteFileDownloadTaskResponse>(`${this.deleteDownloadTaskUrl}/${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  getProgress(ids: number[]): Observable<GetDownloadProgressResponse> {
    let params = "";
    for (let id of ids) {
      params = params + id + ";";
    }

    return this.http.get<GetDownloadProgressResponse>(`${this.getProgressUrl}/${escape(params.substring(0, params.length - 1))}`,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }
}
