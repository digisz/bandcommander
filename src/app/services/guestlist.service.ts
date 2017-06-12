import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

import { Guestlistguest } from './../models/guestlist-guest.model';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class GuestlistService {
private baseUrl =  environment.API_URL;
private token = localStorage.getItem('token');
private headers = new Headers({ 'x-access-token': this.token });
private options = new RequestOptions({ headers: this.headers });

constructor(
  private http: Http) { }


getGuestlist$(id: string): Observable<Guestlistguest[]> {
  return this.http
  .get(this.baseUrl + 'guestlist/' +  id, this.options)
  .map(this.handleSuccess)
  .catch(this.handleError);
}

addGuest$(guest: any): Observable<any> {
  return this.http
  .post(this.baseUrl + 'guestlist/' + guest.eventID, guest , this.options)
  .map(this.handleSuccess)
  .catch(this.handleError);
}

deleteGuest$(guestid: string): Observable<Guestlistguest[]> {
  return this.http
  .delete(this.baseUrl + 'guestlist/' +  guestid, this.options)
  .map(this.handleSuccess)
  .catch(this.handleError);
}

sendGuestlist$(data: any): Observable<any> {
  return this.http
  .post(this.baseUrl + 'mail/guestlist/' +  data.eventID, data, this.options)
  .map(this.handleSuccess)
  .catch(this.handleError);
}


private handleSuccess(res: Response) {
return res.json(); }
private handleError(err: Response | any) {
let errorMsg = err.message ||  'Unable to retrieve data';
return Observable.throw(errorMsg); }
}
