import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { GetFileInfoResponse, DownloadFileResponse, DeleteFileResponse } from './files.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private getAllFilesUrl: string = "/api/file-station/download-proxy/file-infos";
  private downloadFileUrl: string = "/api/file-station/download-proxy/files";
  private deleteFileUrl: string = "/api/file-station/download-proxy/files";

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getFileInfos(): Observable<GetFileInfoResponse> {
    return this.http.get<GetFileInfoResponse>(this.getAllFilesUrl,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  downloadFile(id: number): Observable<DownloadFileResponse> {
    return this.http.get<DownloadFileResponse>(`${this.downloadFileUrl}/${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }

  deleteFile(id: number): Observable<DeleteFileResponse> {
    return this.http.delete<DeleteFileResponse>(`${this.deleteFileUrl}/${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': this.loginService.getLoginToken()
        })
      });
  }
}
