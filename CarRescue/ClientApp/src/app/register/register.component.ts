import { Component, OnInit} from '@angular/core';
import { Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from '../services/user.service';
import { NotificationService } from '../services/notification.service';
import { Router } from '@angular/router';



export interface UserTypes {
  name: string;
  value: string;
 
}
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
/** register component*/
export class RegisterComponent implements OnInit {
    /** register ctor */
  signUpForm = new FormGroup({
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    username: new FormControl('', [Validators.required,Validators.minLength(6)]),
    MobileNumber: new FormControl('', Validators.required),
    rePass: new FormControl('', Validators.required),
    userTypeId: new FormControl('', Validators.required)

  }, { validators: this.passValidator })

  types;

  hide = true;
  
  constructor(
    private translate: TranslateService,
    private userService: UserService,
    private router: Router,
    
    private notificationService: NotificationService) {
    translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');

  }
  ngOnInit()
  {
    this.getUserTypes();
  }
 
  getUserTypes() {
    this.userService.getUserTypes().subscribe(response => {
      this.types = response;
      console.log(response);
    }, error => {
    
    });
  }
  get fullName() {   
    return this.signUpForm.get('fullName') as FormControl;
  }
  
  
  get username() {
    return this.signUpForm.get('username') as FormControl;
  }

  get email() {
    return this.signUpForm.get('email') as FormControl;
  }

  get password() {
    return this.signUpForm.get('password') as FormControl;
  }
  
  get MobileNumber() {
    return this.signUpForm.get('MobileNumber') as FormControl;
    
  }

  get userTypeId() {
    return this.signUpForm.get('userTypeId') as FormControl;
  }
  
  get rePass() {
    return this.signUpForm.get('rePass') as FormControl;
  }
  
  CreateNewUser() {
    console.log(this.signUpForm.value)
    this.userService.createUser(this.signUpForm.value).subscribe(response => {
      
      this.notificationService.createNotificationService('success', 'Signup Success', 'Your account has been created');

     setTimeout(() => {
        this.router.navigate(["/"]);
      }, 5000);
      
    }, error => {
      var errormsg = error.error;
      console.log(error);
      this.notificationService.createNotificationService('error', 'Signup Failed', errormsg);
    });

   
  }
  

 
 
  pass = this.password.value;
  passValidator(AC: AbstractControl) {
    let password = AC.get('password').value; // to get value in input tag
    let confirmPassword = AC.get('rePass').value; // to get value in input tag
    if (password != confirmPassword)
    {
      
      AC.get('rePass').setErrors({
        "MatchPassword": true
      });
      
    } else {
      
      return null
    }
  
  }

  
}



