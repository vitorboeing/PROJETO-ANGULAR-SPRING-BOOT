import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { PickListModule } from 'primeng/picklist';
import {CardModule} from 'primeng/card';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import { UserComponent } from './user.component';


@NgModule({
    imports: [
        PickListModule,
        CardModule,
        FormsModule,
        ToolbarModule,
        CommonModule,
        ButtonModule,
        TableModule,
        PanelModule,
        DialogModule,
        InputTextModule,
        DropdownModule,
        CalendarModule,
        ToastModule,
    ],
    declarations: [
        UserComponent
    ],
    providers: [],
    bootstrap: []
})
export class UserModule { }
