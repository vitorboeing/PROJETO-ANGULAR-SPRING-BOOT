import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { AppMainComponent } from 'src/app/app.main.component';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
    providers: [ConfirmationService]
})
export class AppTopBarComponent implements OnInit {

    items: MenuItem[];
    temaDark : boolean;
    notification : number = 2;

    constructor(public appMain: AppMainComponent , private auth : AuthService , private confirmationService: ConfirmationService , private router : Router) { }

    ngOnInit(): void {
        this.items = [
            {label: 'Dashboard',icon: 'pi pi-fw pi-home', routerLink: ['/']}
        ]
    }

    logout(){
        this.confirmationService.confirm({
            message: 'Are you sure that you want to sign out?',
            accept: () => {
                this.auth.logout()
                this.router.navigate(['/login'])
            }
        });
    }

    ShowNotification(){

    }

}
