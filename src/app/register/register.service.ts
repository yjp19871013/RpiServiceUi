import { Injectable } from '@angular/core';
import { ValidateCodeResquest, RegisterRequest } from './register.model'
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private generateValidateCodeUrl: string = "/api/users/validate-code"
  private registerUrl: string = "/api/users"

  constructor(private http: HttpClient) { }

  generateValidateCode(request: ValidateCodeResquest): Observable<any> {
    return this.http.post<any>(this.generateValidateCodeUrl, request);
  }

  register(request: RegisterRequest): Observable<any> {
    return this.http.post<any>(this.registerUrl, request);
  }
}
