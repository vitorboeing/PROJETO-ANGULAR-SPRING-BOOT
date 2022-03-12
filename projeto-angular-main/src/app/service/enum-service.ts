import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { catchError, retry, throwError } from 'rxjs';


@Injectable({providedIn: 'root'})
export class EnumService {

    API_URL = environment.API + "/enum";

    constructor(protected http: HttpClient) {
    }

    get(path : string): any {
        return this.http.get(this.API_URL + '/' + path)
          .pipe(
            retry(2),
            catchError(this.handleError))
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
