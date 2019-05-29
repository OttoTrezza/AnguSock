
import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from '../pages/pages.routes';
import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';


// import { PagesComponent } from './pages.component';
import { ChatComponent } from '../pages/chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
    declarations: [
        DashboardComponent,
        ChatComponent
    ],
    exports: [
        DashboardComponent,
        ChatComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule
    ]
})
export class PagesModule { }
