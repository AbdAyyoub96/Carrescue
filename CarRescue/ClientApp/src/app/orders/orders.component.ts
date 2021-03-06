import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { MatDialogRef, MatDialog, PageEvent } from '@angular/material';
import { SendOfferdialogComponent } from '../send-offerdialog/send-offerdialog.component';
import { FormGroup } from '@angular/forms';
import { OrderofferService } from '../services/orderoffer.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  user;
  userType;
  orders ;
  order = [];
  SendOfferDialogRef: MatDialogRef<SendOfferdialogComponent>;
  constructor(private notificationService: NotificationService, private offerService: OrderofferService, public dialog: MatDialog, private router: ActivatedRoute, private authService: AuthService, private userService: UserService, private orderService: OrderService, private route: Router) { }

  ngOnInit() {
    this.getLoggedInUserId();
   
  }
  
  openOfferDialog(id) {
    console.log(id);
    this.SendOfferDialogRef = this.dialog.open(SendOfferdialogComponent, { data: { orderId: id ,  userId: this.user.id }});
    this.SendOfferDialogRef.afterClosed().subscribe(data => this.SendOffer(data));
  }
  SendOffer(offer = {} as FormGroup) {

    console.log(offer);

    this.offerService.createOffer(offer).subscribe(response => {

      this.notificationService.createNotificationService('success', 'Send Success', 'Your Offer has been sent');
      console.log("success");

    }, error => {
      console.log("failed");

    });

  }
  onPageChanged(page: PageEvent) {
    console.log(page);
    this.fillTable({}, page.pageIndex + 1, page.pageSize)
  }
  fillTable(filter = {} as any, pageNo, pageSize) {
    this.orderService.GetAllOrders(this.authService.getLoggedInUserId(), filter, pageNo, pageSize).subscribe(response => {
      this.orders = response;
    }, error => {
      console.log(error)
    })


  }

  getLoggedInUserId() {
    this.router.params.subscribe(param => {
      this.userService.getUserDetialsById(param.id).subscribe(response => {
        this.user = response;
        this.userType = this.user.userTypeId;
        console.log(this.user);
        this.fillTable( {}, 1, 10);
      })
    })
  }
  navigateToDetails(id)
  {
    this.route.navigate(['/order-details/'+ id]);
  }
}
