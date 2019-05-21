import { RouterModule, Routes } from '@angular/router';

// import { PagesComponent } from './pages.component';
import { ChatComponent } from '../component/chat/chat.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from '../component/login/login.component';


const pagesRoutes: Routes = [
    { path: 'login', component: LoginComponent, data: { titulo: 'login' } },
   //  { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: 'chat', component: ChatComponent, data: { titulo: 'chat' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
