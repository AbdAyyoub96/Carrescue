import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { Observer } from 'rxjs';  
import { RequestOptions, Headers, Http, Response } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';
import { User } from '../modelInterfaces';


//import { User } from 'app/ModelInterfaces/ModelInterface';

const baseUrl = 'api/Users/'
const getUserRoute = 'GetUserById/';
const updateUserRoute = 'UpdateUserInfo';
const signupRoute = 'SignUp';
const signinRoute = 'signin';
const getUsersRoute = 'GetAllUsers';
const getUserTypesRoute = 'GetUserTypes';
const postAttachmentRoute = "PostUserAttachments/";
const getUserServicesRoute = "GetUserServices";
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};

@Injectable()
export class UserService {
  constructor(private httpClient: HttpClient, private router: Router) {

  }
  //----------------------------------------------------------------------------------------------------------
  getUserTypes()
  {
    return this.httpClient.get(baseUrl + getUserTypesRoute);
  }
  getUserServices() {
    return this.httpClient.get(baseUrl + getUserServicesRoute);
  }
  createUser(user) {
    console.log(user);
    return this.httpClient.post(baseUrl + signupRoute, JSON.stringify(user), httpOptions);
  }
  saveProfilePic(file) {
    const formData: FormData = new FormData();
    formData.append('File', file);
    console.log(formData);
    return this.httpClient.post(baseUrl + postAttachmentRoute , formData);
  }
  //----------------------------------------------------------------------------------------------------------
  getUserDetialsById(id) {
    return this.httpClient.get(baseUrl + getUserRoute + id);
  }

  getUserById(id) {
    return this.httpClient.get(baseUrl +  id);
  }
  
  getUsers(filter, pageNo, pageSize) {
    console.log(filter);
    return this.httpClient.get(baseUrl + getUsersRoute + "?username=" + filter + "&PageNo=" + pageNo + "&PageSize=" + pageSize);
  }

  

    login(user) {
    return this.httpClient.post(baseUrl + "Login", JSON.stringify(user), httpOptions)
     }

  updateUserInfo(user)
  {
    console.log(user)
    return this.httpClient.post(baseUrl + updateUserRoute, JSON.stringify(user), httpOptions);
  }
}
