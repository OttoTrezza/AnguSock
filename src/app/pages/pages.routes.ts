import { RouterModule, Routes } from '@angular/router';
// import { PagesComponent } from './pages.component';
import { ChatComponent } from './chat/chat.component';
import { DashboardComponent } from './dashboard/dashboard.component';



const pagesRoutes: Routes = [

    { path: 'chat', component: ChatComponent, data: { titulo: 'chat' } },
    { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
