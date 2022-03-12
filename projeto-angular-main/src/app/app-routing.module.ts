import { UserComponent } from './user/user.component';
import { AuthGuard } from './service/auth-service';
import { TaskComponent } from './task/task.component';
import { ProductComponent } from './records/product/product.component';
import { ProviderComponent } from './records/provider/provider.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormLayoutComponent } from './components/formlayout/formlayout.component';
import { PanelsComponent } from './components/panels/panels.component';
import { OverlaysComponent } from './components/overlays/overlays.component';
import { MediaComponent } from './components/media/media.component';
import { MessagesComponent } from './components/messages/messages.component';
import { MiscComponent } from './components/misc/misc.component';
import { EmptyComponent } from './components/empty/empty.component';
import { ChartsComponent } from './components/charts/charts.component';
import { FileComponent } from './components/file/file.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { AppMainComponent } from './app.main.component';
import { InputComponent } from './components/input/input.component';
import { TableComponent } from './components/table/table.component';
import { ListComponent } from './components/list/list.component';
import { TreeComponent } from './components/tree/tree.component';
import { CrudComponent } from './components/crud/crud.component';
import { BlocksComponent } from './components/blocks/blocks.component';
import { FloatLabelComponent } from './components/floatlabel/floatlabel.component';
import { InvalidStateComponent } from './components/invalidstate/invalidstate.component';
import { TimelineComponent } from './components/timeline/timeline.component';
import { IconsComponent } from './components/icons/icons.component';
import { LandingComponent } from './components/landing/landing.component';
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
                    {path: 'uikit/formlayout', component: FormLayoutComponent},
                    {path: 'uikit/input', component: InputComponent},
                    {path: 'uikit/floatlabel', component: FloatLabelComponent},
                    {path: 'uikit/invalidstate', component: InvalidStateComponent},
                    {path: 'uikit/table', component: TableComponent},
                    {path: 'uikit/list', component: ListComponent},
                    {path: 'uikit/tree', component: TreeComponent},
                    {path: 'uikit/panel', component: PanelsComponent},
                    {path: 'uikit/overlay', component: OverlaysComponent},
                    {path: 'uikit/media', component: MediaComponent},
                    {path: 'uikit/menu', loadChildren: () => import('./components/menus/menus.module').then(m => m.MenusModule)},
                    {path: 'uikit/message', component: MessagesComponent},
                    {path: 'uikit/misc', component: MiscComponent},
                    {path: 'uikit/charts', component: ChartsComponent},
                    {path: 'uikit/file', component: FileComponent},
                    {path: 'pages/crud', component: CrudComponent},
                    {path: 'task/panel', component: TaskComponent},
                    {path: 'record/provider', component: ProviderComponent},
                    {path: 'record/product', component: ProductComponent},
                    {path: 'report/provider', component: ProviderReportComponent},
                    {path: 'report/product', component: ProductComponent},
                    {path: 'pages/timeline', component: TimelineComponent},
                    {path: 'pages/empty', component: EmptyComponent},
                    {path: 'icons', component: IconsComponent},
                    {path: 'blocks', component: BlocksComponent},
                    {path: 'documentation', component: DocumentationComponent},
                    {path: 'user', component: UserComponent}

                ],
                canActivate : [AuthGuard]
            },
            {path:'pages/landing', component: LandingComponent},
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
