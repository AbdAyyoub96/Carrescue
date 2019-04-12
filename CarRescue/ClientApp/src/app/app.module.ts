import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppComponent } from './app.component';
import { DemoMaterialModule } from './material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule, MatTableModule, MatToolbarModule, MatMenuModule, MatButtonModule, MatCardModule } from '@angular/material';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { RatingComponent } from './rating/rating.component';
import { ProfileComponent } from './profile/profile.component';
import { InternationalizationService } from './services/internationalization.service';
import { TripsService } from './services/trips.service';
import { UserService } from './services/user.service';
import { AngularDateTimePickerModule } from 'angular2-datetimepicker';
import { FilteringComponent } from '../app/filtering/filtering.component';
import { CompleteProfileComponent } from '../app/complete-profile/complete-profile.component';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";

import { JwtModule } from '@auth0/angular-jwt';
import { AuthService } from './services/auth.service';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { NotificationService } from './services/notification.service';
import { RatingService } from './services/rating.service';
import { TripRequestService } from './services/trip-request.service';
import { AdminService } from './services/admin.service';
import { ReportComponent } from './report/report.component';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderService } from './services/order.service';
import { SendOfferdialogComponent } from './send-offerdialog/send-offerdialog.component';
import { OrderofferService } from './services/orderoffer.service';

// Configs 




// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
export function tokenGetter() {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    RegisterComponent,
    NewOrderComponent,
    ProfileComponent,
    RatingComponent,
    OrdersComponent,
    FilteringComponent,
    CompleteProfileComponent,
    SendOfferdialogComponent,
    ReportComponent,
   
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    GooglePlaceModule,
    AngularDateTimePickerModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    
    
    MatToolbarModule, MatMenuModule, MatTableModule, MatButtonModule, MatCardModule,
    
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter
      }
    }),
    ReactiveFormsModule,
    DemoMaterialModule,
    
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    FormsModule,
    SimpleNotificationsModule.forRoot(),
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'new-order/:id', component: NewOrderComponent },
      { path: 'orders/:id', component: OrdersComponent },  
      { path: 'profile/:id', component: ProfileComponent },
      { path: 'rating', component: RatingComponent },
      { path: 'filtering', component: FilteringComponent },
      { path: 'complete-profile', component: CompleteProfileComponent },
      { path: 'send-offer', component: SendOfferdialogComponent },
      { path: 'report', component: ReportComponent },
     

    ])
  ],
  providers: [
    InternationalizationService,
    OrderofferService,
    NotificationService,
    AuthService,
    RatingService,
    UserService,
    TripRequestService,
    AdminService,
    OrderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
