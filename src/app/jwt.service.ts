import { Injectable } from '@angular/core';

const TOKEN_KEY = "token";
//const EXP = 2 * 60 * 60 * 1000;
const EXP = 2 * 1000;

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  save(token: string) {
    var curTime = new Date().getTime();
    localStorage[TOKEN_KEY] = JSON.stringify({ token: token, time: curTime });
  }

  get(): string {
    var tokenJson = localStorage.getItem(TOKEN_KEY);
    if (null == tokenJson) {
        return "";
    }

    var tokenObj = JSON.parse(tokenJson);
    if (new Date().getTime() - tokenObj.time > EXP) {
      this.delete();
    } else {
      return tokenObj.token;
    }
  }

  delete() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
