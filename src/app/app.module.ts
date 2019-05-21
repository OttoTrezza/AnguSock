import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SocketIoModule, SocketIoConfig} from 'ngx-socket-io';
const config: SocketIoConfig = {
  url: environment.wsUrl, options: {}
};
import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { ChatComponent } from './component/chat/chat.component';
import { FormsModule } from '@angular/forms';
import { ChatService } from './services/chat.service';
import { LoginComponent } from './component/login/login.component';
import { PagesComponent } from './pages/pages.component';

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatService,
    LoginComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
