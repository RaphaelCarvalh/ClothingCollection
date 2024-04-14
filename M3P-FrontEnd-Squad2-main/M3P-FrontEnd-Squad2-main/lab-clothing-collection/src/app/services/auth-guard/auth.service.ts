import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

var httpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) }

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn = false;

  constructor(private http: HttpClient) { }

  createHeaderToken() {
    const token = localStorage.getItem("jwt");
    httpOptions = { headers: new HttpHeaders({ "Authorization": "Bearer " + token,  "Content-Type": "application/json" }) };
  }

  isAuthenticated(): boolean {
    this.createHeaderToken();
    return this.isLoggedIn;
  }

  getToken(): string | null {
    return localStorage.getItem('userType');
  }

  getUserType(): number | null {
    const userType = localStorage.getItem('userType');
    if (userType) {
      return +userType;
    }
    return null;
  }

  logged() {
    if (typeof localStorage !== 'undefined') {
      const logged = localStorage.getItem('logged');
      if (logged === 'true') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
