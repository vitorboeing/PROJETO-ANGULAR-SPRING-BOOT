import { AppConfigComponent } from './../core/config/app.config.component';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../api/user';

@Injectable({ providedIn: 'root' })
export class UserService {

    api = environment.API;

    appCofing: AppConfigComponent

    constructor(protected http: HttpClient, ) { }

    getUser(): void {
         this.http.get(this.api + '/user/info').pipe(retry(2), catchError(this.handleError))
            .subscribe({
                next: (user : User) =>  {
                    this.appCofing.changeThemeDark(user.themeDark)
                }
            });
    }

    getUserInfo(): Observable<any> {
        return this.http.get(this.api + '/user/info').pipe(retry(2), catchError(this.handleError))
   }

    findAll(): Observable<any> {
        return this.http.get(this.api + '/user').pipe(retry(2), catchError(this.handleError))
    }

    handleError(error: HttpErrorResponse) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
            // Erro ocorreu no lado do client
            errorMessage = error.error.message;
        } else {
            // Erro ocorreu no lado do servidor
            errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(errorMessage);
    };

}
