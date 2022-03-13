import { CrudService } from './crud-service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Product } from '../api/product';
import { environment } from 'src/environments/environment';

@Injectable({providedIn: 'root'})
export class ProductService extends CrudService<Product> {

    constructor(protected http: HttpClient) {
        super(http , environment.API + '/product');
    }
}
