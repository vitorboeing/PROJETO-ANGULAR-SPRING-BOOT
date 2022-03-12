
export interface Provider {
    id?: number;
    code?: string;
    name?: string;
    description?: string;
    street?: string;
    country?: string;
    state?: string;
    contactList?: Contact[]
}

export interface Contact {
    id?: number;
    responsible?: string;
    email?: string;
    fone?: string;
}

