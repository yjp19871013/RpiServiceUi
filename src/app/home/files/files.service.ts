import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../../login/login.service';
import { GetFileInfoResponse } from './files.model';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  private getAllFilesUrl: string = "/api/file-station/download-proxy/files";

  private authorizationHeaders = {
    headers: new HttpHeaders({
      'Authorization': this.loginService.getLoginToken()
    })
  };

  constructor(private http: HttpClient, private loginService: LoginService) { }

  getFileInfos(): Observable<GetFileInfoResponse> {
      return this.http.get<GetFileInfoResponse>(this.getAllFilesUrl, this.authorizationHeaders);
  }
}
