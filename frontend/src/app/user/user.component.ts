import { Component,  OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AppConfig } from '../api/appconfig';
import { ConfigService } from '../service/app.config.service';
import { UserService } from '../service/user-service';

@Component({
    templateUrl: './user.component.html',
    providers: [MessageService, ConfirmationService],
})
export class UserComponent implements OnInit {

    user : any;
    config: AppConfig;

    constructor(private service : UserService ,  public configService: ConfigService, ) {
        this.user = {}
     }

    ngOnInit() {
        this.service.getUserInfo().subscribe({
            next: (res) => this.user = res
        });
        this.changeThemeDark(this.user.themeDark)
    }

    changeThemeDark(dark:boolean){
        const theme =  dark  ? 'lara-dark-blue' : 'lara-light-indigo';
        let themeElement = document.getElementById('theme-css');
        themeElement.setAttribute('href', 'assets/theme/' + theme + '/theme.css');
        this.configService.updateConfig({...this.config, ...{theme, dark}});
    }

}
