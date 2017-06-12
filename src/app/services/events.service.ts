import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Event } from './../models/event.model';
import { Eventdetail } from './../models/event-detail.model';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class EventsService {
private baseUrl =  environment.API_URL;
private headers = new Headers({ 'x-access-token': this.authenticationService.token });
private options = new RequestOptions({ headers: this.headers });

constructor(
  private http: Http,
  private authenticationService: AuthenticationService) { }

getAllEvents$(archive: boolean): Observable<Event[]> {
  let archiveOption = '';
  if (archive) {
    archiveOption = '/archive/';
  }
  return this.http
  .get(this.baseUrl + 'events' + archiveOption, this.options)
  .map(this.handleSuccess)
  .catch(this.handleError);
}

getEvent$(id: string): Observable<Eventdetail> {
return this.http
.get(this.baseUrl + 'event/' + id, this.options)
.map(this.handleSuccess)
.catch(this.handleError);
}

deleteEvent$(id: string): Observable<any> {
return this.http
.delete(this.baseUrl + 'event/' + id, this.options)
.map(this.handleSuccess)
.catch(this.handleError);
}

saveEvent$(event: Eventdetail): Observable<any> {
return this.http
.post(this.baseUrl + 'event/' + event._id, event, this.options)
.map(this.handleSuccess)
.catch(this.handleError);
}

private handleSuccess(res: Response) {
return res.json(); }
private handleError(err: Response | any) {
let errorMsg = err.message ||  'Unable to retrieve data';
return Observable.throw(errorMsg); }
}
