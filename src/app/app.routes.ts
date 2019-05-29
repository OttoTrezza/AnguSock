import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './component/login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
// import { ChatComponent } from './component/chat/chat.component';



const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {path: '',
    component: PagesComponent,
    loadChildren: './pages/pages.module#PagesModule'
    },
    { path: '**', component: NopagefoundComponent }
];


export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );