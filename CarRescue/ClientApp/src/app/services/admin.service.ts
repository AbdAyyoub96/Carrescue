import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, Subscriber } from 'rxjs';
import { Observer } from 'rxjs';
import {  Headers, Response } from '@angular/http';
import { Router } from '@angular/router';
import { error } from 'util';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};


const UsersUrl = '/api/Users/';
const reportUrl = '/api/Reports/';
const getAllUsersRoute = 'GetAllUsers';
const activateUSerRoute = 'ApproveUser/';
const getInActiveUsers = 'GetAllApprovals';

const blockUserRoute = 'BlockUser/';
const getReportRoute = 'GetAllReports';
@Injectable()
export class AdminService {
  constructor(private httpClient: HttpClient, private router: Router) {

  }

  getInactiveUsers()
  {
    return this.httpClient.get(UsersUrl + getInActiveUsers);
  }
  getAllUsers() {
    return this.httpClient.get(UsersUrl + getAllUsersRoute);
  }
  activateUSer(id)
  {
    return this.httpClient.get(UsersUrl + activateUSerRoute + id);
  }
  blockUser(id)
  {
    return this.httpClient.get(UsersUrl + blockUserRoute + id);
  }
  getReports() {
    return this.httpClient.get(reportUrl + getReportRoute);
  }

}
