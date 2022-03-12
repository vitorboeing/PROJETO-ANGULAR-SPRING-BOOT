import { Provider } from "@angular/core";

export interface Product {
    id?: string;
    code?: string;
    name?: string;
    description?: string;
    providerlist: Provider[];
}
