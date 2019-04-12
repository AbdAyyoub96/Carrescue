import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { RatingComponent } from '../rating/rating.component';
import { TranslateService } from '@ngx-translate/core';
import { CompleteProfileComponent } from '../complete-profile/complete-profile.component';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RatingService } from '../services/rating.service';
import { FormGroup} from '@angular/forms';
import { NotificationService } from '../services/notification.service';
import { ProfileService } from '../services/profile.service';
import { ReportComponent } from '../report/report.component';
export interface States {
  name: string;
  value: number;

}
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})


/** profile component*/
export class ProfileComponent implements OnInit {

  states: States[] = [
    { name: 'Amman', value: 1 }, { name: 'Zarqa', value: 2 },
    { name: 'Irbid', value: 3 }, { name: 'Jerash', value: 4 },
    { name: 'Ajloun', value: 5 }, { name: 'Mafraq', value: 6 },
    { name: 'Madaba', value: 7 }, { name: 'Salt', value: 8 },
    { name: 'Al-karak', value: 9 }, { name: 'Tafila', value: 10 },
    { name: 'Maan', value: 11 }, { name: 'Aqaba', value: 12 }
  ];
  displayedColumns = ['fullName', 'username', 'email', 'password'];  
  url = "https://cdn2.iconfinder.com/data/icons/business-management-52/96/Artboard_20-512.png";
  user = {} as any;
  user2 = {} as any;
 
  /** profile ctor */
  RatingDialogRef: MatDialogRef<RatingComponent>;
  ReportDialogRef: MatDialogRef<ReportComponent>;
  CompleteDialogRef: MatDialogRef<CompleteProfileComponent>;
  constructor(public dialog: MatDialog,
    private userService: UserService,
    public translate: TranslateService,
    private authService: AuthService,
    private router: ActivatedRoute,
    private route: Router,
   
    private profileService: ProfileService,
    private ratingService: RatingService,
    private notificationService: NotificationService) {
    this.authService.checkLogin();
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');
  }

  ngOnInit() {
    this.router.params.subscribe(param => { 
      this.userService.getUserDetialsById(param.id).subscribe(response => {
      this.user = response;
      console.log(this.user);
    })
    })
  }
 
  


  openRatingDialog()
  {
    this.RatingDialogRef = this.dialog.open(RatingComponent);
    this.RatingDialogRef.afterClosed().subscribe(data => this.fillTable(data));    
  }

  openReportDialog() {
    this.ReportDialogRef = this.dialog.open(ReportComponent);
    this.ReportDialogRef.afterClosed().subscribe(data => this.fillReport(data));
  }

  fillTable(rate = {} as FormGroup) {

    console.log(rate);
    
    this.ratingService.createRate(rate, Number(this.user.id)).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Rating Success', 'Your rate has been sent');
      console.log("success");
    
    }, error => {
      console.log("failed");
     
    });
    
  }
  fillReport(report = {} as FormGroup) {

    console.log(report);
    console.log(this.user.id);
    this.profileService.createReport(report, Number(this.user.id)).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Report Success', 'Your report has been sent');
      console.log("success");

    }, error => {
      console.log("failed");

    });

  }
  editProfileInfo(user) {

    console.log(user);
    console.log(this.user.id);
    this.userService.updateUserInfo(this.user.id, user).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Update Success', 'Your Profile has been Updated Successfully');
      console.log("success");
      
    }, error => {
      console.log("failed");

    });

  }
  

  openCompleteDialog() {
    this.CompleteDialogRef = this.dialog.open(CompleteProfileComponent);
    this.CompleteDialogRef.afterClosed().subscribe(data => this.editProfileInfo(data));

  }
  
  userState(stateNumber,userType)
  {
    if (userType != 1) {
      let statename = this.states.find(x => x.value == stateNumber);
      return statename.name;
    }
  }
  
  

}


  
