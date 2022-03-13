import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { PanelModule } from 'primeng/panel';
import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import {CardModule} from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import { UserComponent } from './user.component';
import { DividerModule } from 'primeng/divider';


@NgModule({
    imports: [
        CardModule,
        FormsModule,
        CommonModule,
        ButtonModule,
        PanelModule,
        DialogModule,
        InputTextModule,
        InputSwitchModule,
        DividerModule

    ],
    declarations: [
        UserComponent
    ],
    providers: [],
    bootstrap: []
})
export class UserModule { }
