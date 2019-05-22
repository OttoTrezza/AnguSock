import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: environment.wsUrl, options: {}
};

import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    SharedModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
