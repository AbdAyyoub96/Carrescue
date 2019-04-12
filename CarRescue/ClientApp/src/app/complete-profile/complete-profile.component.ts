import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialogRef } from '@angular/material';
export interface States {
  name: string;
  value: number;

}
@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.component.html',
  styleUrls: ['./complete-profile.component.css']
})


export class CompleteProfileComponent implements OnInit {
  user = {} as any;
  EditProfileForm = new FormGroup({
    fullName: new FormControl(),   
    mobileNumber: new FormControl(),   
    state: new FormControl(),
   

  })

  states: States[] = [
    { name: 'Amman', value: 1 }, { name: 'Zarqa', value: 2 },
    { name: 'Irbid', value: 3 }, { name: 'Jerash', value: 4 },
    { name: 'Ajloun', value: 5 }, { name: 'Mafraq', value: 6 },
    { name: 'Madaba', value: 7 }, { name: 'Salt', value: 8 },
    { name: 'Al-karak', value: 9 }, { name: 'Tafila', value: 10 },
    { name: 'Maan', value: 11 }, { name: 'Aqaba', value: 12 }
  ];
  ngOnInit() {
    this.userService.getUserDetialsById(this.authService.getLoggedInUserId()).subscribe(response => {
      this.user = response;
      console.log(this.user);
      this.EditProfileForm.patchValue(this.user)


    })
    
  }
  constructor(
    public translate: TranslateService,
    private userService: UserService,
    private router: Router,
    private dialogRef: MatDialogRef<CompleteProfileComponent>,
    private authService: AuthService) {

    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }
  get fullName() {
    return this.EditProfileForm.get('fullName') as FormControl;
  }
  
  get mobileNumber() {
    return this.EditProfileForm.get('mobileNumber') as FormControl;

  }

  get state() {
    return this.EditProfileForm.get('state') as FormControl;
  }

 
  updateInfo() {
    this.user.fullName = this.fullName.value;
    this.user.mobileNumber = this.mobileNumber.value;
    this.user.state = this.state.value;
    
   
    console.log(this.user);
    this.dialogRef.close(this.user);
  }
  


}
