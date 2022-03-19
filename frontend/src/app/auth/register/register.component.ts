import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth-service';
import { MessageService } from 'primeng/api';
@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    providers: [MessageService],
    styles: [`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `]
})
export class RegisterComponent implements OnInit, OnDestroy {

    email: string;
    userName: string;
    password: string;
    password2: string;
    submitted: boolean;
    apiError: boolean;

    config: AppConfig;
    subscription: Subscription;
    error: any;

    constructor(public configService: ConfigService, private authService: AuthService, private router: Router, private messageService: MessageService) { }

    signup(userName: string, email: string, password: string, password2: string) {
        if (password !== password2) {
            this.submitted = true;
            this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'Passwords are not the same' });
        } else {
            this.authService.signup(userName , email, password).subscribe({
                error : (error) =>  {
                    this.apiError = true;
                    this.messageService.add({ severity: 'error', summary: 'Rejected', detail: error.error.message });
                } ,
                complete :  () =>  this.router.navigate([''])
            });
        }
    }

    logout() {
        this.authService.logout()
    }

    ngOnInit(): void {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    get isRequired(): boolean {
        return (this.email != undefined && this.userName != undefined && this.password != undefined && this.password2 != undefined);
    }

}
