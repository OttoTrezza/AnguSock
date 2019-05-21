
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from '../pages/pages.routes';


import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';


// import { PagesComponent } from './pages.component';
import { ChatComponent } from '../component/chat/chat.component';
import { LoginComponent } from '../component/login/login.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';




@NgModule({
    declarations: [
        // PagesComponent,
        ChatComponent,
        NopagefoundComponent,
        LoginComponent
    ],
    exports: [
        LoginComponent,
        NopagefoundComponent
    ],
    imports: [
        CommonModule,
        PAGES_ROUTES,
        FormsModule
    ]
})
export class PagesModule { }
