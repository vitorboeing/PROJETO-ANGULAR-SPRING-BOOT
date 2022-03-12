import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap, shareReplay } from 'rxjs/operators';

import * as jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Injectable()
export class AuthService {

    private apiRoot = environment.API;

    constructor(private http: HttpClient) { }

    private setSession(authResult : any) {
        const token = authResult.token;
        const payload = <any>jwtDecode.default(token);
        const expiresAt = moment.unix(payload.exp);
        console.log(payload);
        localStorage.setItem('token', authResult.token);
        localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    }

    get token(): string {
        return localStorage.getItem('token');
    }

    login(email: string, password: string) {
        return this.http.post(this.apiRoot.concat('/auth/login'), { email, password }).pipe(tap(response => this.setSession(response)), shareReplay(),);
    }

    signup(userName : string, email: string, password: string) {
        return this.http.post(this.apiRoot.concat('/auth/register'), { userName , email, password }).pipe(tap(response => this.setSession(response)),shareReplay(),);
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('expires_at');
    }

    refreshToken() {
        if (moment().isBetween(this.getExpiration().subtract(1, 'days'), this.getExpiration()))
            return this.http.post(this.apiRoot.concat('refresh-token/'), { token: this.token }).pipe(tap(response => this.setSession(response)), shareReplay(),).subscribe();

        return null;
    }

    getExpiration() {
        const expiration = localStorage.getItem('expires_at');
        const expiresAt = JSON.parse(expiration);

        return moment(expiresAt);
    }

    isLoggedIn() {
        return moment().isBefore(this.getExpiration());
    }

    isLoggedOut() {
        return !this.isLoggedIn();
    }
}

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = localStorage.getItem('token');

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set('Authorization', 'Bearer '.concat(token))
            });

            return next.handle(cloned);
        } else {
            return next.handle(req);
        }
    }
}

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate() {

        if (this.authService.isLoggedIn()) {
            // this.authService.refreshToken();
            return true;
        } else {
            this.authService.logout();
            this.router.navigate(['/login']);

            return false;
        }
    }
}

interface JWTPayload {
    user_id: number;
    username: string;
    email: string;
    iat: number;
    exp: number;
}
