import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    menuMode = 'static';
    horizontalMenu!: boolean;
    darkMode = false;
    menuColorMode = 'light';
    menuColor = 'layout-menu-dark';
    themeColor = 'blue';
    layoutColor = 'blue';
    ripple = true;
    inputStyle = 'outlined';

    constructor(private primengConfig: PrimeNGConfig) { }

    ngOnInit() {
        this.primengConfig.ripple = true;
        document.documentElement.style.fontSize = '14px';
    }
}
