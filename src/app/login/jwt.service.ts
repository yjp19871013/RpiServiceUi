import { Injectable } from '@angular/core';
import { User } from './login.model'

const TOKEN_KEY = "token";
const EXP = 2 * 60 * 60 * 1000;

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  save(token: string, user: User) {
    this.delete ();

    const curTime = new Date().getTime();
    localStorage[TOKEN_KEY] = JSON.stringify({ token: token, user: user, time: curTime });
  }

  get(): any {
    const tokenJson = localStorage.getItem(TOKEN_KEY);
    if (null == tokenJson) {
      return null;
    }

    const tokenObj = JSON.parse(tokenJson);
    if (new Date().getTime() - tokenObj.time > EXP) {
      localStorage.removeItem(TOKEN_KEY);
      return null;
    } else {
      return tokenObj;
    }
  }

  delete() {
    localStorage.removeItem(TOKEN_KEY);
  }
}
