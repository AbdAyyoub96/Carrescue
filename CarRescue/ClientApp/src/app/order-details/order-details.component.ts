import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationService } from '../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SendOfferdialogComponent } from '../send-offerdialog/send-offerdialog.component';
import { OrderService } from '../services/order.service';
import { FormGroup } from '@angular/forms';
import { OrderofferService } from '../services/orderoffer.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  public order;
  SendOfferDialogRef: MatDialogRef<SendOfferdialogComponent>;
  constructor(public translate: TranslateService,
    private notificationService: NotificationService,
    private router: ActivatedRoute,
    public authService: AuthService,
    public dialog: MatDialog,
    private orderService: OrderService,
    private offerService: OrderofferService,
    private userService: UserService,
    private route: Router
    ) { }

  ngOnInit() {
    this.getOrder();
  }
  getOrder()
  {
    this.router.params.subscribe(params => {
      console.log(params.id);
      this.orderService.GetOrdersById(params.id).subscribe(response => {
        this.order = response;
        console.log(this.order);
        console.log(this.authService.getLoggedInUserId());
      })
    })
  }
  openOfferDialog(id) {
    console.log(id);
    this.SendOfferDialogRef = this.dialog.open(SendOfferdialogComponent, { data: { orderId: id , userId: this.authService.getLoggedInUserId() } });
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
  getLoggedInUserId() {
    this.router.params.subscribe(param => {
      this.userService.getUserDetialsById(param.id).subscribe(response => {

        console.log(response);
        
      })
    })
  }
  ChangeOfferStatus(id, status)
  {
    this.offerService.changeOfferStatus(id,status).subscribe(response => {
      this.notificationService.createNotificationService('success', 'Send Success', 'Your Order Offer Status has been Changed');
      console.log(response);
      this.getOrder();

    })
  }
  cancelOrder(id)
  {
    this.orderService.cancelOrder(id).subscribe(response => {
      this.route.navigate(['/profile/' + this.order.userId]);
    })
  }
  
}
