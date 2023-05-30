import {BrowserModule} from '@angular/platform-browser';
import {ModuleWithProviders, NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './componente/home/home.component';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './componente/login/login.component';
import {HttpInterceptorModule} from './service/header-interceptor.service';
import {UsuarioComponent} from './componente/usuario/usuario/usuario.component';
import {UsuarioAddComponent} from './componente/usuario/usuario-add/usuario-add.component';
import {GuardiaoGuard} from './service/guardiao.guard';
import {NgxMaskModule, IConfig} from 'ngx-mask';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgxCurrencyModule} from 'ngx-currency';
import {UsuarioReportComponent} from './componente/usuario/usuario-report/usuario-report.component';

export const appRouters: Routes = [
  {
    path: '', component: LoginComponent
  },
  {
    path: 'home', component: HomeComponent, canActivate: [GuardiaoGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'usuarioList', component: UsuarioComponent, canActivate: [GuardiaoGuard]
  },
  {
    path: 'usuarioAdd', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]
  },
  {
    path: 'usuarioAdd/:id', component: UsuarioAddComponent, canActivate: [GuardiaoGuard]
  },
  {
    path: 'usuarioReport', component: UsuarioReportComponent, canActivate: [GuardiaoGuard]
  }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRouters);

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UsuarioComponent,
    UsuarioAddComponent,
    UsuarioReportComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpInterceptorModule,
    routes,
    NgxMaskModule.forRoot(options),
    NgxPaginationModule,
    NgbModule,
    NgxCurrencyModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
