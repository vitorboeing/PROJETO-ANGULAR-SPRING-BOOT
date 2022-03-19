import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';
import { catchError, Observable, retry, throwError } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class ReportService {

    API_URL = environment.API + "/report";

    constructor(protected http: HttpClient) { }

    providerReport(params: any): Observable<Blob> {
        return this.http.get(this.API_URL + '/provider', { 'responseType': 'blob', params }).pipe(retry(2), catchError(this.handleError))
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
