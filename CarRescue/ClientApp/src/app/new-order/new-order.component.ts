import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../services/notification.service';
export interface States {
  name: string;
  value: number;

}
export interface CarModels {
  name: string;
  value: number;

}
export interface CarType {
  name: string;
  model: number;
  value: number;

}
@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  constructor(private notificationService: NotificationService, private router: ActivatedRoute, private authService: AuthService, private userService: UserService, private orderService: OrderService) { }
  states: States[] = [
    { name: 'Amman', value: 1 }, { name: 'Zarqa', value: 2 },
    { name: 'Irbid', value: 3 }, { name: 'Jerash', value: 4 },
    { name: 'Ajloun', value: 5 }, { name: 'Mafraq', value: 6 },
    { name: 'Madaba', value: 7 }, { name: 'Salt', value: 8 },
    { name: 'Al-karak', value: 9 }, { name: 'Tafila', value: 10 },
    { name: 'Maan', value: 11 }, { name: 'Aqaba', value: 12 }
  ];
  carModels: CarModels[] = [
    { name: 'KIA', value: 1 }, { name: 'Mercedes', value: 2 },
   
  ];
  carTypes: CarType[] = [
    { name: 'Obtima', value: 1, model: 1 }, { name: 'Sephia', value: 2, model: 1 },
    { name: 'Benz', value: 3, model: 2 }, { name: 'E200', value: 4, model: 2 },
   
  ];
  userId;
  user;
  types
  ngOnInit() {
    this.getLoggedInUserId();
    this.getUserServices();
    
    
  }
  filterTypes()
  {
   
    this.types = this.carTypes.filter(x => x.model == this.carModel.value);
  }
  getLoggedInUserId()
  {
    this.router.params.subscribe(param => {
      this.userService.getUserDetialsById(param.id).subscribe(response => {
        this.user = response;
        this.userId = this.user.id;
        console.log(this.user);
      })
    })
  }
  newOrderForm = new FormGroup({
    userId: new FormControl('', Validators.required),
    locations: new FormControl('', Validators.required),
    serviceTypeId: new FormControl('', Validators.required),
    notes: new FormControl(''),
    gasType: new FormControl(''),
    gasQuantity: new FormControl(''),
    carType: new FormControl(''),
    carModel: new FormControl(''),
    manuYear: new FormControl(''),
    state: new FormControl('', Validators.required)

  })
  get locations() {
    return this.newOrderForm.get('locations') as FormControl;
  }
  get notes() {
    return this.newOrderForm.get('notes') as FormControl;
  }
  get gasType() {
    return this.newOrderForm.get('gasType') as FormControl;
  }
  get gasQuantity() {
    return this.newOrderForm.get('gasQuantity') as FormControl;
  }
  get carType() {
    return this.newOrderForm.get('carType') as FormControl;
  }
  get carModel() {
    return this.newOrderForm.get('carModel') as FormControl;
  }
  get manuYear() {
    return this.newOrderForm.get('manuYear') as FormControl;
  }
  get state() {
    return this.newOrderForm.get('state') as FormControl;
  }
  get serviceTypeId() {
    return this.newOrderForm.get('serviceTypeId') as FormControl;
  }
  
  services;
  getUserServices() {
    this.userService.getUserServices().subscribe(response => {
      this.services = response;
      console.log(response);
    }, error => {

    });
  }
  order;
  CreateNewOrder()
  {
    var today = new Date(); 

    this.newOrderForm.controls["userId"].setValue(this.userId);
    
    this.orderService.PostOrder(this.newOrderForm.value).subscribe(response => {
      this.notificationService.createNotificationService('success', 'Order Success', 'Your Order has been Created ');

      this.order = response;
      console.log(response);
    }, error => {
      this.notificationService.createNotificationService('error', 'Order Faailed', error.error);
    });
  }

}
