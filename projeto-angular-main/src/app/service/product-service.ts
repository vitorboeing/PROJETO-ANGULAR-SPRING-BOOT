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
    getProductsSmall() {
        return this.http.get<any>('assets/demo/data/products-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProducts() {
        return this.http.get<any>('localhost:8081/product')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsMixed() {
        return this.http.get<any>('assets/demo/data/products-mixed.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }

    getProductsWithOrdersSmall() {
        return this.http.get<any>('assets/demo/data/products-orders-small.json')
        .toPromise()
        .then(res => res.data as Product[])
        .then(data => data);
    }
}
