import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';


const baseUrl = 'api/Orders/';
const PostOrderRoute = 'PostOrder';
const getOrderByCatRoute = 'GetAllOrdersForProvider/';
const getOrderByIdRoute = 'GetOrder/';
const cancelOrderRoute = 'CancelOrder/'

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
 
  GetAllOrders(userid,filter, pageNo, pageSize) {
    console.log(pageNo)
    console.log(pageSize)
    return this.httpClient.get(baseUrl + getOrderByCatRoute + userid +"/"+ pageNo+"/" + pageSize)
  }

  GetOrdersById(id) {
    return this.httpClient.get(baseUrl + getOrderByIdRoute + id);
  }
  cancelOrder(id) {
    return this.httpClient.get(baseUrl + cancelOrderRoute + id);
  }
}
