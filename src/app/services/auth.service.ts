import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  userLast : string;
  constructor() { }

  authenticate(userName, password) {
    if(userName === 'admin' && password === '123Admin') {
      sessionStorage.setItem('authenticatedUser', userName);
      return true;      
    }
    return false;
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem('authenticatedUser');
    if(user === 'admin') {
      return true
    } else {
      return false
    }
  }

  logout() {
    sessionStorage.removeItem('authenticatedUser');
  }
}
