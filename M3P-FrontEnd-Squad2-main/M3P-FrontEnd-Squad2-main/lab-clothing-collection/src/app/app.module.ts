import { CUSTOM_ELEMENTS_SCHEMA, DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { Chart2Component } from './components/chart2/chart2.component';
import { ChartComponent } from './components/chart/chart.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NgChartsModule } from 'ng2-charts';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RedefinePasswordComponent } from './pages/redefine-password/redefine-password.component';
import { SendingConfirmationComponent } from './pages/sending-confirmation/sending-confirmation.component';
import { CompanyCreateComponent } from './pages/company/company-create/company-create.component';
import { LayoutFullScreenComponent } from './layout/layout-full-screen/layout-full-screen.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { CollectionCreateComponent } from './pages/collection/collection-create/collection-create.component';
import { ModelCreateComponent } from './pages/model/model-create/model-create.component';
import { SubMenuComponent } from './components/sub-menu/sub-menu.component';
import { CompanyManagerCreateComponent } from './pages/company/company-manager-create/company-manager-create.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { CollectionListComponent } from './pages/collection/collection-list/collection-list.component';
import { CollectionEditComponent } from './pages/collection/collection-edit/collection-edit.component';
import { ModelListComponent } from './pages/model/model-list/model-list.component';
import { ModelEditComponent } from './pages/model/model-edit/model-edit.component';
import { UserCreateComponent } from './pages/user/user-create/user-create.component';
import { UserEditComponent } from './pages/user/user-edit/user-edit.component';
import { UserListComponent } from './pages/user/user-list/user-list.component';
import { SystemConfigurationComponent } from './pages/configuration/system-configuration/system-configuration.component';
import { UserService } from './services/user/user.service';
import { UnderConstructionComponent } from './pages/under-construction/under-construction.component';
import { FilterCompany } from './Pipe/filterId';
import { GetHelpCreateComponent } from './pages/get-help/get-help-create/get-help-create.component';
import { GetHelpEditComponent } from './pages/get-help/get-help-edit/get-help-edit.component';
import { GetHelpListComponent } from './pages/get-help/get-help-list/get-help-list.component';


registerLocaleData(ptBr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RedefinePasswordComponent,
    SendingConfirmationComponent,
    CompanyCreateComponent,
    LayoutFullScreenComponent,
    PerfilComponent,
    SidebarComponent,
    HeaderComponent,
    ModelCreateComponent,
    CollectionCreateComponent,
    SubMenuComponent,
    CompanyManagerCreateComponent,
    DashboardComponent,
    CollectionListComponent,
    CollectionEditComponent,
    ModelListComponent,
    ModelEditComponent,
    UserCreateComponent,
    UserEditComponent,
    UserListComponent,
    SystemConfigurationComponent,
    UnderConstructionComponent,
    FilterCompany,
    Chart2Component,
    ChartComponent,
    GetHelpListComponent,
    GetHelpCreateComponent,
    GetHelpEditComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatSnackBarModule,
    MatMenuModule,
    MatButtonModule,
    MatSortModule,
    MatStepperModule,
    RouterModule,
    ToastrModule.forRoot(),
    NgxMaskPipe,
    NgApexchartsModule,
    Ng2GoogleChartsModule,
    NgChartsModule
  ],
  providers: [ UserService, provideNgxMask(),
    { provide: LOCALE_ID, useValue: 'pt' },
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
    { provide: MAT_RADIO_DEFAULT_OPTIONS, useValue: { color: 'accent' }, },
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
