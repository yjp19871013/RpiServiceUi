import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  NewFileDownloadTask, FileDownloadTask,
  DeleteFileDownloadTaskResponse, GetAllDownloadTasksResponse
} from './file-download.model';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService {

  private getAllDownloadTasksUrl: string = "/api/file-station/download-proxy/tasks";
  private addDownloadTaskUrl: string = "/api/file-station/download-proxy/tasks";
  private deleteDownloadTaskUrl: string = "/api/file-station/download-proxy/tasks";

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
}
