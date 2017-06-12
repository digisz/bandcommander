import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from './../../environments/environment';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class DocumentService {
  private baseUrl =  environment.API_URL;
  private token = localStorage.getItem('token');
  private headers = new Headers({ 'x-access-token': this.token });
  private options = new RequestOptions({ headers: this.headers });

  constructor(
    private http: Http) { }

    addDocument$(document: any): Observable<any> {
      this.headers.append('enctype', 'multipart/form-data');
      this.headers.append('Accept', 'application/json');
      const options = new RequestOptions({ headers: this.headers });
      return this.http
      .post(this.baseUrl + 'document/', document , this.options)
      .map(this.handleSuccess)
      .catch(this.handleError);
    }

    removeDocument$(document: any): Observable<any> {
      return this.http
      .delete(this.baseUrl + 'document/'+ encodeURIComponent(document.key)+"/" , this.options)
      .map(this.handleSuccess)
      .catch(this.handleError);
    }

    private handleSuccess(res: Response) {
    return res.json(); }
    private handleError(err: Response | any) {
    let errorMsg = err.message ||  'Unable to retrieve data';
    return Observable.throw(errorMsg); }

}
