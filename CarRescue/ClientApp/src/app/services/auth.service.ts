import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
const tokenSoapLink = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/";
@Injectable()
export class AuthService {
  token;
  constructor(private jwtService: JwtHelperService, private router: Router) {

  }

  getLoggedInUserId() {
    this.token = localStorage.getItem("user")
    return this.token.id;

  }

  getLoggedInUserUsername() {
    let token = localStorage.getItem("jwt")
    return this.jwtService.decodeToken(token)[tokenSoapLink + "name"]

  }

  getLoggedInUserEmail() {
    let token = localStorage.getItem("jwt")
    return this.jwtService.decodeToken(token)[tokenSoapLink + "emailaddress"]
  }

  checkLogin() {
    if (!this.isLoggedin()) {
      this.router.navigate(["login"])
    }
  }

  isLoggedin() {
    let token = localStorage.getItem("jwt");
    if (!token)
      return false;

    let isExpired = this.jwtService.isTokenExpired(token);
    if (isExpired) {
      return false;
    }

    return true;
  }

  Logout() {
    localStorage.removeItem("jwt");
    this.router.navigate(["login"])
  }
}
