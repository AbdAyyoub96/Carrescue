import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const baseUrl = 'api/Orders/';
const PostOrderRoute = 'PostOrder';
const getOrderByIdRoute = 'GetAllOrdersByCategory/';
const createNewTripRoute = 'CreateNewTrip';
const deleteTaskAssigneeRoute = 'DeleteTaskAssignee/'

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable()
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  PostOrder(order) {
    return this.httpClient.post(baseUrl + PostOrderRoute, JSON.stringify(order), httpOptions);
  }
  GetAllOrders(id) {
    return this.httpClient.get(baseUrl + getOrderByIdRoute+id);
  }
}
