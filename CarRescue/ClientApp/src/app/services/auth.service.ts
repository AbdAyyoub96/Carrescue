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
    this.token = localStorage.getItem("userId")
    return this.token;

  }

  getLoggedInUserUsername() {
    let token = localStorage.getItem("jwt")
    return this.jwtService.decodeToken(token)[tokenSoapLink + "name"]

  }
  getLoggedInUserTypeId() {
    this.token = localStorage.getItem("userType")
    return this.token;

  }

  getLoggedInUserEmail() {
    let token = localStorage.getItem("jwt")
    return this.jwtService.decodeToken(token)[tokenSoapLink + "emailaddress"]
  }

  checkLogin() {
    if (!this.isLoggedin()) {
      this.router.navigate(["home"])
    }
    else
    {
      let userType = localStorage.getItem("userType")

      if (userType == '1') { this.router.navigate(["/new-order/" + this.getLoggedInUserId()]); }
      else { this.router.navigate(["/orders/" + this.getLoggedInUserId()])}
    }
  }

  isLoggedin() {
    let token = localStorage.getItem("user");
    if (!token)
      return false;

   

    return true;
  }

  Logout() {
    localStorage.removeItem("user");
    this.router.navigate(["login"])
  }
}
