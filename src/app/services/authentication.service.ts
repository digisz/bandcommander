import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { environment } from './../../environments/environment';


@Injectable()
export class AuthenticationService {
    public token: string;
    private baseUrl =  environment.API_URL;


    constructor(private http: Http) {
        // set token if saved in local storage
        const currentToken = localStorage.getItem('token');
        this.token = currentToken;
    }

    login(username: string, password: string): Observable<boolean> {
        return this.http.post(this.baseUrl + 'authenticate', { name: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().token;
                if (token) {
                    // set token property
                    this.token = token;
                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('username', response.json().user);
                    localStorage.setItem('role', response.json().role);
                    localStorage.setItem('token', token);

                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }

    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem('username');
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    magiclink(username: string): Observable<boolean> {
        return this.http.post(this.baseUrl + 'authenticate/magiclink', { name: username})
            .map((response: Response) => {
                return true;
            });
    }
}
