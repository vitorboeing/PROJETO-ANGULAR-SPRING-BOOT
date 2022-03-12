import { forkJoin, Observable } from 'rxjs';
import { ProviderService } from './../../service/provider-service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { CountryService } from '../../service/country-service';
import { Provider } from 'src/app/api/provider';
import { Country } from 'src/app/api/customer';

@Component({
    templateUrl: './provider.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class ProviderComponent implements OnInit {

    providerDialog: boolean;
    deleteProviderDialog: boolean = false;
    deleteProvidersDialog: boolean = false;

    provider: Provider;
    providers: Provider[];
    selectedProviders: Provider[];
    countries: Country[]

    submitted: boolean;
    cols: any[];
    rowsPerPageOptions = [5, 10, 20];

    constructor(private service: ProviderService, private messageService: MessageService, private confirmationService: ConfirmationService, private countryService: CountryService) { }

    ngOnInit() {
        this.findAll();
        this.countryService.getCountries().then(
            countries => { this.countries = countries; }
        );

        this.cols = [
            { field: 'code', header: 'Code' },
            { field: 'name', header: 'Name' },
        ];
    }

    openNew() {
        this.provider = {
            contactList: []
        }
        this.submitted = false;
        this.providerDialog = true;
    }

    deleteSelectedProviders() {
        this.deleteProvidersDialog = true;
    }

    edit(provider: Provider) {
        this.service.getById(provider.id).subscribe({
            next: (res) => this.provider = res,
            complete: () => this.providerDialog = true
        });
    }

    openDeleteModal(provider : Provider) {
        this.provider = provider;
        this.deleteProviderDialog = true
    }

    confirmDeleteSelected() {
        this.deleteProvidersDialog = false;
        const requests = this.selectedProviders.map(provider => this.service.delete(provider));
        forkJoin(requests).subscribe({
            complete : () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Providers Deleted', life: 3000 });
                this.findAll();
                this.selectedProviders = null;
            }
        });
    }

    confirmDelete() {
        this.service.delete(this.provider).subscribe({
            complete: () => {
                this.deleteProviderDialog = false
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Deleted', life: 3000 });
                this.provider = {};
            }
        });
    }

    hideDialog() {
        this.providerDialog = false;
        this.submitted = false;
    }

    save() {
        this.submitted = true;
        this.service.save(this.provider).subscribe({
            complete: () => {
                this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Provider Updated', life: 3000 });
                this.findAll();
                this.providerDialog = false;
                this.provider = {};
            }
        })
    }

    findAll() {
        this.service.getAll().subscribe({
            next: (res) => this.providers = res
        });
    }

    addContact() {
        this.provider.contactList.push({});
    }

    removeRow(event: any) {
        this.provider.contactList.splice(event);
    }

}
