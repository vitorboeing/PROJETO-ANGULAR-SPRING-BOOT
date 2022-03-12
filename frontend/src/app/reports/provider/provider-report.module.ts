import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProviderReportComponent } from './provider-report.component';
import { NgModule } from "@angular/core";

import {PanelModule} from 'primeng/panel';
import {ButtonModule} from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
    imports: [
        PanelModule,
        ButtonModule,
        DropdownModule,
        CommonModule,
        FormsModule,
        InputTextModule,
    ],
    declarations: [ProviderReportComponent],
    providers: [],
    bootstrap: []
})
export class ProviderReportModule { }
