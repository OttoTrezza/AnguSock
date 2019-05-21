import { RouterModule, Routes } from '@angular/router';
import { NopagefoundComponent } from './pages/nopagefound/nopagefound.component';
import { ChatComponent } from './component/chat/chat.component';
import { LoginComponent } from './component/login/login.component';
import { PagesComponent } from './pages/pages.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'chat', component: ChatComponent },
    {path: '',
    component: PagesComponent,
    loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
