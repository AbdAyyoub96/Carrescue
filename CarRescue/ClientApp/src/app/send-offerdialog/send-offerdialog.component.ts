import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatDialogRef } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Inject } from '@angular/core';

export interface States {
  name: string;
  value: number;

}
@Component({
  selector: 'app-send-offerdialog',
  templateUrl: './send-offerdialog.component.html',
  styleUrls: ['./send-offerdialog.component.css']
})
export class SendOfferdialogComponent implements OnInit {
  
  states: States[] = [
    { name: 'Amman', value: 1 }, { name: 'Zarqa', value: 2 },
    { name: 'Irbid', value: 3 }, { name: 'Jerash', value: 4 },
    { name: 'Ajloun', value: 5 }, { name: 'Mafraq', value: 6 },
    { name: 'Madaba', value: 7 }, { name: 'Salt', value: 8 },
    { name: 'Al-karak', value: 9 }, { name: 'Tafila', value: 10 },
    { name: 'Maan', value: 11 }, { name: 'Aqaba', value: 12 }
  ];
  newOfferForm = new FormGroup({
    orderId: new FormControl('', Validators.required),
    userId: new FormControl('', Validators.required),
    location: new FormControl('', Validators.required),
    expectedArrivalTime: new FormControl('', Validators.required),
    price: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),

  })
  constructor(public translate: TranslateService, @Inject(MAT_DIALOG_DATA) public data,  
    private router: ActivatedRoute,
    private auth: AuthService,
    private userService: UserService,
    private dialogRef: MatDialogRef<SendOfferdialogComponent>) {
      translate.use(localStorage.getItem('lang') !== null || localStorage.getItem('lang') !== null ? localStorage.getItem('lang') : 'en');
 }

  ngOnInit() {
    console.log(this.data)
    console.log(this.data.orderId)
  }
  get location() {
    return this.newOfferForm.get('location') as FormControl;
  }
  get expectedArrivalTime() {
    return this.newOfferForm.get('expectedArrivalTime') as FormControl;
  }
  get price() {
    return this.newOfferForm.get('price') as FormControl;
  }
  get notes() {
    return this.newOfferForm.get('notes') as FormControl;
  }
  get state() {
    return this.newOfferForm.get('state') as FormControl;
  }
  CreateNewOffer() {
    this.newOfferForm.controls["orderId"].setValue(this.data.orderId);
    this.newOfferForm.controls["userId"].setValue(Number(this.data.userId));

    console.log(this.newOfferForm.value);
    this.dialogRef.close(this.newOfferForm.value);
   
  }

}
