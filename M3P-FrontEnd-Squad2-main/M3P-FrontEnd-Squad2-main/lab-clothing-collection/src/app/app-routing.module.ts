import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RedefinePasswordComponent } from './pages/redefine-password/redefine-password.component';
import { SendingConfirmationComponent } from './pages/sending-confirmation/sending-confirmation.component';
import { CompanyCreateComponent } from './pages/company/company-create/company-create.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { CompanyManagerCreateComponent } from './pages/company/company-manager-create/company-manager-create.component';
import { AuthGuard } from './guard/auth.guard';
import { LayoutFullScreenComponent } from './layout/layout-full-screen/layout-full-screen.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CollectionEditComponent } from './pages/collection/collection-edit/collection-edit.component';
import { CollectionListComponent } from './pages/collection/collection-list/collection-list.component';
import { ModelEditComponent } from './pages/model/model-edit/model-edit.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { CollectionCreateComponent } from './pages/collection/collection-create/collection-create.component';
import { ModelListComponent } from './pages/model/model-list/model-list.component';
import { ModelCreateComponent } from './pages/model/model-create/model-create.component';
import { SystemConfigurationComponent } from './pages/configuration/system-configuration/system-configuration.component';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { AdminAuthGuard } from './services/adminAuthGuard/adminauthguard.service';
import { ManagerAuthGuard } from './services/managerAuthGuard/manager-auth-guard.service';
import { GetHelpListComponent } from './pages/get-help/get-help-list/get-help-list.component';
import { GetHelpCreateComponent } from './pages/get-help/get-help-create/get-help-create.component';
import { GetHelpEditComponent } from './pages/get-help/get-help-edit/get-help-edit.component';

const routes: Routes = [

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'redefinePassword', component: RedefinePasswordComponent },
  { path: 'sendingConfirmation', component: SendingConfirmationComponent },

  { path: 'companyCreate', component: CompanyCreateComponent },
  { path: 'companyCreate/companyManagerCreate', component: CompanyManagerCreateComponent },

  { path: 'wm/:id', component: LayoutFullScreenComponent, canActivateChild:[AuthGuard], children:[
    { path: 'wm/:id', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardComponent },

    { path: 'perfil/:id', component: PerfilComponent, canActivate: [ManagerAuthGuard]},

    { path: 'collection', component: CollectionListComponent },
    { path: 'collection/collectionCreate', component: CollectionCreateComponent, canActivate: [AdminAuthGuard] },
    { path: 'collection/collectionEdit/:id', component: CollectionEditComponent, canActivate: [AdminAuthGuard] },

    { path: 'model', component: ModelListComponent },
    { path: 'model/modelCreate', component: ModelCreateComponent, canActivate: [AdminAuthGuard] },
    { path: 'model/modelEdit/:id', component: ModelEditComponent, canActivate: [AdminAuthGuard] },

    { path: 'user', component: UserListComponent, canActivate: [ManagerAuthGuard] },
    { path: 'user/userCreate', component: UserCreateComponent, canActivate: [ManagerAuthGuard] },
    { path: 'user/userEdit/:id', component: UserEditComponent, canActivate: [ManagerAuthGuard] },

    { path: 'systemConfiguration/:id', component: SystemConfigurationComponent, canActivate: [AdminAuthGuard] },
    { path: 'comments', component: UnderConstructionComponent },

    { path: 'getHelp', component: GetHelpListComponent },
    { path: 'getHelp/getHelpCreate', component: GetHelpCreateComponent, canActivate: [AdminAuthGuard] },
    { path: 'getHelp/getHelpEdit/:id', component: GetHelpEditComponent, canActivate: [AdminAuthGuard] },
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
