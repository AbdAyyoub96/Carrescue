import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user;
  userType;
  orders;
  constructor(private router: ActivatedRoute, private authService: AuthService, private userService: UserService, private orderService: OrderService) { }

  ngOnInit() {
    this.getLoggedInUserId();
   
  }
  getOrders(type) {
    this.orderService.GetAllOrders(type).subscribe(response => {
      this.orders = response;
      console.log(response);
    }, error => {

    });
  }
  getLoggedInUserId() {
    this.router.params.subscribe(param => {
      this.userService.getUserDetialsById(param.id).subscribe(response => {
        this.user = response;
        this.userType = this.user.userTypeId-1;
        console.log(this.user);
        this.getOrders(this.userType);
      })
    })
  }
}
