import { UserComponent } from './user/user.component';
import { AuthGuard } from './service/auth-service';
import { TaskComponent } from './task/task.component';
import { ProductComponent } from './records/product/product.component';
import { ProviderComponent } from './records/provider/provider.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { AppMainComponent } from './app.main.component';

import { LoginComponent } from './auth/login/login.component';
import { ErrorComponent } from './components/error/error.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { AccessComponent } from './components/access/access.component';
import { ProviderReportComponent } from './reports/provider/provider-report.component';
import { RegisterComponent } from './auth/register/register.component';
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppMainComponent,
                children: [
                    {path: '', component: DashboardComponent},
                    // {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'task/panel', component: TaskComponent},
                    {path: 'record/provider', component: ProviderComponent},
                    {path: 'record/product', component: ProductComponent},
                    {path: 'report/provider', component: ProviderReportComponent},
                    {path: 'report/product', component: ProductComponent},
                    {path: 'user', component: UserComponent}

                ],
                canActivate : [AuthGuard]
            },
            {path:'login', component: LoginComponent},
            {path:'register', component: RegisterComponent},
            {path:'pages/error', component: ErrorComponent},
            {path:'notfound', component: NotfoundComponent},
            {path: '**', redirectTo: 'notfound'},
            {path:'pages/access', component: AccessComponent},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
