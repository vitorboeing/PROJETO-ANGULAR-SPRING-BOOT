import { Component, AfterViewInit, OnDestroy, Renderer2, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { AppComponent } from './app.component';
import { ConfigService } from './service/app.config.service';
import { AppConfig } from './api/appconfig';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-main',
    templateUrl: './app.main.component.html',
    animations: [
        trigger('submenu', [
            state('hidden', style({
                height: '0px'
            })),
            state('visible', style({
                height: '*'
            })),
            transition('visible => hidden', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)')),
            transition('hidden => visible', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
        ])
    ]
})
export class AppMainComponent implements AfterViewInit, OnDestroy, OnInit {

    public menuInactiveDesktop: boolean;

    public menuActiveMobile: boolean;

    public overlayMenuActive: boolean;

    public staticMenuInactive: boolean = false;

    public profileActive: boolean;

    public topMenuActive: boolean;

    public topMenuLeaving: boolean;

    public theme: string;

    rightPanelClick!: boolean;

    rightPanelActive!: boolean;

    menuClick!: boolean;

    staticMenuActive!: boolean;

    menuMobileActive!: boolean;

    megaMenuClick!: boolean;

    megaMenuActive!: boolean;

    megaMenuMobileClick!: boolean;

    megaMenuMobileActive!: boolean;

    topbarItemClick!: boolean;

    topbarMobileMenuClick!: boolean;

    topbarMobileMenuActive!: boolean;

    sidebarActive!: boolean;

    activeTopbarItem: any;

    topbarMenuActive!: boolean;

    menuHoverActive!: boolean;

    configActive!: boolean;

    documentClickListener: () => void;

    topMenuButtonClick: boolean;


    configClick: boolean;

    config: AppConfig;

    subscription: Subscription;

    constructor(public renderer: Renderer2, public app: AppComponent, public configService: ConfigService) { }

    ngOnInit() {
        this.config = this.configService.config;
        this.subscription = this.configService.configUpdate$.subscribe(config => this.config = config);
    }

    ngAfterViewInit() {
        // hides the overlay menu and top menu if outside is clicked
        this.documentClickListener = this.renderer.listen('body', 'click', (event) => {
            if (!this.isDesktop()) {
                if (!this.menuClick) {
                    this.menuActiveMobile = false;
                }

                if (!this.topMenuButtonClick) {
                    this.hideTopMenu();
                }
            }
            else {
                if (!this.menuClick && this.isOverlay()) {
                    this.menuInactiveDesktop = true;
                }
                if (!this.menuClick){
                    this.overlayMenuActive = false;
                }
            }

            if (this.configActive && !this.configClick) {
                this.configActive = false;
            }

            this.configClick = false;
            this.menuClick = false;
            this.topMenuButtonClick = false;
        });
    }

    toggleMenu(event: Event) {
        this.menuClick = true;

        if (this.isDesktop()) {
            if (this.app.menuMode === 'overlay') {
                if(this.menuActiveMobile === true) {
                    this.overlayMenuActive = true;
                }

                this.overlayMenuActive = !this.overlayMenuActive;
                this.menuActiveMobile = false;
            }
            else if (this.app.menuMode === 'static') {
                this.staticMenuInactive = !this.staticMenuInactive;
            }
        }
        else {
            this.menuActiveMobile = !this.menuActiveMobile;
            this.topMenuActive = false;
        }

        event.preventDefault();
    }

    toggleProfile(event: Event) {
        this.profileActive = !this.profileActive;
        event.preventDefault();
    }

    toggleTopMenu(event: Event) {
        this.topMenuButtonClick = true;
        this.menuActiveMobile = false;

        if (this.topMenuActive) {
            this.hideTopMenu();
        } else {
            this.topMenuActive = true;
        }

        event.preventDefault();
    }

    hideTopMenu() {
        this.topMenuLeaving = true;
        setTimeout(() => {
            this.topMenuActive = false;
            this.topMenuLeaving = false;
        }, 1);
    }

    onMenuClick() {
        this.menuClick = true;
    }

    onConfigClick(event) {
        this.configClick = true;
    }

    isStatic() {
        return this.app.menuMode === 'static';
    }

    isOverlay() {
        return this.app.menuMode === 'overlay';
    }

    onSearchClick() {
        this.topMenuButtonClick = true;
    }

    ngOnDestroy() {
        if (this.documentClickListener) {
            this.documentClickListener();
        }


        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

    onMegaMenuButtonClick(event: Event) {
        this.megaMenuClick = true;
        this.megaMenuActive = !this.megaMenuActive;
        event.preventDefault();
    }

    onMegaMenuClick(event: Event) {
        this.megaMenuClick = true;
        event.preventDefault();
    }

    onTopbarItemClick(event: Event, item: any) {
        this.topbarItemClick = true;

        if (this.activeTopbarItem === item) {
            this.activeTopbarItem = null;
        } else {
            this.activeTopbarItem = item;
        }

        event.preventDefault();
    }

    onRightPanelButtonClick(event: Event) {
        this.rightPanelClick = true;
        this.rightPanelActive = !this.rightPanelActive;

        event.preventDefault();
    }

    onRightPanelClose(event: Event) {
        this.rightPanelActive = false;
        this.rightPanelClick = false;

        event.preventDefault();
    }

    onRightPanelClick(event: Event) {
        this.rightPanelClick = true;

        event.preventDefault();
    }

    onTopbarMobileMenuButtonClick(event: Event) {
        this.topbarMobileMenuClick = true;
        this.topbarMobileMenuActive = !this.topbarMobileMenuActive;

        event.preventDefault();
    }

    onMegaMenuMobileButtonClick(event: Event) {
        this.megaMenuMobileClick = true;
        this.megaMenuMobileActive = !this.megaMenuMobileActive;

        event.preventDefault();
    }

    onMenuButtonClick(event: Event) {
        this.menuClick = true;
        this.topbarMenuActive = false;

        if (this.isMobile()) {
            this.menuMobileActive = !this.menuMobileActive;
        }

        event.preventDefault();
    }

    onSidebarClick(event: Event) {
        this.menuClick = true;
    }

    onToggleMenuClick(event: Event) {
        this.staticMenuActive = !this.staticMenuActive;
        event.preventDefault();
    }

    onRippleChange(event: any) {
        this.app.ripple = event.checked;
        // this.primengConfig = event.checked;
    }

    isDesktop() {
        return window.innerWidth > 991;
    }

    isMobile() {
        return window.innerWidth <= 991;
    }

    isHorizontal() {
        return this.app.horizontalMenu === true;
    }

}
