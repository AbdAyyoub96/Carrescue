import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';

const baseUrl = 'api/OrderOffers/';
const PostOfferRoute = 'CreateOffer';
const getOrderByIdRoute = 'GetAllOrdersByCategory/';
const createNewTripRoute = 'CreateNewTrip';
const deleteTaskAssigneeRoute = 'DeleteTaskAssignee/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class OrderofferService {

  constructor(private httpClient: HttpClient) { }
  createOffer(offer)
  {
    return this.httpClient.post(baseUrl + PostOfferRoute, JSON.stringify(offer), httpOptions);
  }
}
