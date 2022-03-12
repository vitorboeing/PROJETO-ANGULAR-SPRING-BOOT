import { Provider } from './../../api/provider';
import { ReportService } from './../../service/report-service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProviderService } from 'src/app/service/provider-service';

@Component({
    templateUrl: './provider-report.component.html',
    providers: [MessageService, ConfirmationService],
    styleUrls: ['../../../assets/demo/badges.scss']
})
export class ProviderReportComponent implements OnInit {

    providers: Provider[]
    selectProvider: Provider;

    constructor(private service: ReportService, private providerService: ProviderService) { }

    ngOnInit(): void {
        this.providerService.getAll().subscribe({
            next: (res) => this.providers = res
        })
    }

    print() {
        this.service.providerReport(this.selectProvider?.id).subscribe({
            next: (blob) => {
                const pdf = new Blob([blob], { type: 'application/pdf' });
                window.open(URL.createObjectURL(pdf))
            }
        });
    }
}



