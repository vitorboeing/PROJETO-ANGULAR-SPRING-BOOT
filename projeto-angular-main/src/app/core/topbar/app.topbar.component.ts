import { AuthService } from 'src/app/service/auth-service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AppMainComponent } from 'src/app/app.main.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent implements OnInit {

    items: MenuItem[];
    temaDark : boolean

    constructor(public appMain: AppMainComponent , private auth : AuthService) { }

    ngOnInit(): void {}

    logout(){
        this.auth.logout()
    }
}
