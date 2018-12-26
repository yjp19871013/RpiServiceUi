import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  getAllDownloadTasks(): Observable<GetAllDownloadTasksResponse> {
    return this.http.get<GetAllDownloadTasksResponse>(this.getAllDownloadTasksUrl);
  }

  addDownloadTask(newTask: NewFileDownloadTask): Observable<FileDownloadTask> {
    return this.http.post<FileDownloadTask>(this.addDownloadTaskUrl, newTask);
  }

  deleteDownloadTask(id: number): Observable<DeleteFileDownloadTaskResponse> {
    return this.http.delete<DeleteFileDownloadTaskResponse>(this.deleteDownloadTaskUrl + "/" + id);
  }

  getProgress(ids: number[]): Observable<GetDownloadProgressResponse> {
    var params = "";
    ids.forEach((item, index) => {
      params = params + item + ";";
    });

    return this.http.get<GetDownloadProgressResponse>(this.getProgressUrl + "/" + escape(params.substring(0, params.length - 1)));
  }
}
