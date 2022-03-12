import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Provider } from '../api/provider';
import { CrudService } from './crud-service';

@Injectable({providedIn: 'root'})
export class TaskService extends CrudService<Provider> {

    constructor(protected http: HttpClient) {
        super(http , environment.API + '/task');
    }

}
