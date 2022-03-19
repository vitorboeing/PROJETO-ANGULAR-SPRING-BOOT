import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CrudService } from './crud-service';

@Injectable({providedIn: 'root'})
export class TaskService extends CrudService<any> {

    constructor(protected http: HttpClient) {
        super(http , environment.API + '/task');
    }

    findAllByUser(): Observable<any[]> {
        return this.http.get<any[]>(environment.API + '/task/user' ).pipe(retry(10), catchError(this.handleError))
    }
}
