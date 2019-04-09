import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { InternationalizationService } from '../services/internationalization.service';
import { AuthService } from '../services/auth.service';
import { TripsService } from '../services/trips.service';
import { ActivatedRoute } from '@angular/router';
import { TripRequestService } from '../services/trip-request.service';
import { RideModalComponent } from '../ride-modal/ride-modal.component';
import { MatDialogRef, MatDialog } from '@angular/material';
import { FormGroup } from '@angular/forms';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.component.html',
  styleUrls: ['./trip-details.component.css']
})
export class TripDetailsComponent implements OnInit
{
  public Trip;
  RideDialogRef: MatDialogRef<RideModalComponent>;
  constructor(public translate: TranslateService,
              private notificationService: NotificationService,
              private router: ActivatedRoute,
              private authService: AuthService,
              public dialog: MatDialog,
              private tripService: TripsService,
              private rideService: TripRequestService){
    this.authService.checkLogin()
  }

  ngOnInit() {
    this.router.params.subscribe(params => {
      console.log(params.id);
      this.tripService.getTripById(params.id).subscribe(response => {
        this.Trip = response;
        console.log(this.Trip);
      })
    })
  }


  openRideDialog() {
    this.RideDialogRef = this.dialog.open(RideModalComponent);
    this.RideDialogRef.afterClosed().subscribe(data => this.fillTable(data));
  }

  fillTable(ride = {} as FormGroup) {

    console.log(ride);

    this.rideService.createRate(ride, Number(this.Trip.id)).subscribe(response => {
      
      this.notificationService.createNotificationService('success', 'Request Success', 'Your request has been sent');
      console.log("success");
      
    }, error => {
      this.notificationService.createNotificationService('error', 'Request Faile', error.error);
      console.log("failed");

    });

  }
}
