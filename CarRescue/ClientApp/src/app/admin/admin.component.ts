import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { PageEvent, MatPaginator, MatSort, MatDialogRef, MatDialog } from '@angular/material';
import { UserService } from '../services/user.service';
import { MatTableDataSource } from '@angular/material';
import { AdminService } from '../services/admin.service';
import { merge, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { HttpClient } from 'selenium-webdriver/http';
import { User } from '../modelInterfaces';
import { FormControl, FormGroup } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { DomSanitizer } from '@angular/platform-browser';

export interface States {
  name: string;
  value: number;

}

@Component({
    selector: 'app-admin',
    templateUrl: './admin.component.html',
    styleUrls: ['./admin.component.scss']
})
/** admin component*/
export class AdminComponent {
  /** admin ctor */

  states: States[] = [
    { name: 'Amman', value: 1 }, { name: 'Zarqa', value: 2 },
    { name: 'Irbid', value: 3 }, { name: 'Jerash', value: 4 },
    { name: 'Ajloun', value: 5 }, { name: 'Mafraq', value: 6 },
    { name: 'Madaba', value: 7 }, { name: 'Salt', value: 8 },
    { name: 'Al-karak', value: 9 }, { name: 'Tafila', value: 10 },
    { name: 'Maan', value: 11 }, { name: 'Aqaba', value: 12 }
  ];
  userState(stateNumber, userType) {
    if (userType != 1) {
      let statename = this.states.find(x => x.value == stateNumber);
      return statename.name;
    }
  }
  public allTrips;
  public all;
  public allUsers;
  public users;
  public allReports;
  public totalReports;
  public reports;
  public ads;
  public inActiveUsers;
  totalusers;
  filter = new FormControl("");
  constructor(private authService: AuthService,
    
    public translate: TranslateService,
    public userService: UserService,
    public adminService: AdminService,
   
    private notificationService:NotificationService,
    public dialog: MatDialog,) {
      this.authService.checkLogin();
  }
  fileUrl;
  ngOnInit() {
    this.getInactiveUsers();
    this.getAllUsers();
    this.getAllreports();
    
  }
 
  getInactiveUsers()
  {
    this.adminService.getInactiveUsers().subscribe(response => {
      this.inActiveUsers = response;

    }, error => {
      console.log(error)
    })
  }
  getAllUsers() {
    this.adminService.getAllUsers().subscribe(response => {
      this.allUsers = response;
      this.totalusers = this.allUsers.length
    }, error => {
      console.log(error)
    })
  }

  activateUser(id,username)
  {
    this.adminService.activateUSer(id).subscribe(response => {
      this.notificationService.createNotificationService('success', 'Activation Success', '(' + username + ') has been activated successfully');
      this.ngOnInit();
    }, error => {
      console.log("failed")
      })
   
  }
  blockUser(id,username)
  {
    this.adminService.blockUser(id).subscribe(response => {
      this.notificationService.createNotificationService('success', 'Block Success', '(' + username + ') has been blocked successfully');
      this.ngOnInit();
    }, error => {
      console.log(error)
    })
  }
  public getAllreports() {
    this.adminService.getReports().subscribe(response => {
      this.allReports = response;
      this.totalReports = this.allReports.length
    }, error => {
      console.log("failed")
    })
  }
  
  }
  
 
 
  
  



