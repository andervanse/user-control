
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Constants } from './Constants';

@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    login(email: string, password: string): Observable<any> {
        console.log(Constants.HOME_API, email, password);
        return this.http.post(Constants.HOME_API + 'auth/token', { email: email, password: password})
        .map((response: Response) => {
            localStorage.setItem('user', JSON.stringify(response.json()));
            return { loged: response.ok, userName: this.getUserName() } ;
        }).catch((error: any, caught: Observable<any>) => {
            console.log('AuthService - error:', error);
            throw Observable.throw(error._body);
        });
    }

    logout(): void {
        localStorage.removeItem('user');
    }

    getToken(): any {
        const user = JSON.parse(localStorage.getItem('user'));

        if (user == null || (new Date()).getTime() > Date.parse(user.expiration)) {
            this.logout();
            return null;
        } else {
            return user.token;
        }
    }

    isAuthenticated(): boolean {
        return this.getToken() !== null;
    }

    getUserName(): string {
        const token = this.getToken();

        if (token != null) {
            const obj = this.parseJwt(token);
            return obj.sub;
        } else {
            return null;
        }
    }

    handleError(errors: any): any {
        console.log(errors);
    }

    parseJwt (token) {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse(window.atob(base64));
    };

}
