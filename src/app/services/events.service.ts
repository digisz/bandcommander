import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Event } from './../models/event.model';
import { Eventdetail } from './../models/event-detail.model';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class EventsService {
private baseUrl =  environment.API_URL;


constructor(
  private http: Http,
  private authenticationService: AuthenticationService) { }


getAllEvents$(archive: boolean): Observable<Event[]> {
  const headers = new Headers({ 'x-access-token': this.authenticationService.token });
  const options = new RequestOptions({ headers: headers });
  let archiveOption = '';
  if (archive) {
    archiveOption = '/archive/';
  }
  return this.http
  .get(this.baseUrl + 'events' + archiveOption, options)
  .map(this.handleSuccess)
  .catch(this.handleError);
}

getEvent$(id: string): Observable<Eventdetail> {
const headers = new Headers({ 'x-access-token': this.authenticationService.token });
const options = new RequestOptions({ headers: headers });
return this.http
.get(this.baseUrl + 'event/' + id, options)
.map(this.handleSuccess)
.catch(this.handleError);
}

deleteEvent$(id: string): Observable<any> {
const headers = new Headers({ 'x-access-token': this.authenticationService.token });
const options = new RequestOptions({ headers: headers });
return this.http
.delete(this.baseUrl + 'event/' + id, options)
.map(this.handleSuccess)
.catch(this.handleError);
}

saveEvent$(event: Eventdetail): Observable<any> {
const headers = new Headers({ 'x-access-token': this.authenticationService.token });
const options = new RequestOptions({ headers: headers });
return this.http
.post(this.baseUrl + 'event/' + event._id, event, options)
.map(this.handleSuccess)
.catch(this.handleError);
}

private handleSuccess(res: Response) {
return res.json(); }
private handleError(err: Response | any) {
let errorMsg = err.message ||  'Unable to retrieve data';
return Observable.throw(errorMsg); }
}
