import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './layout/base-layout/base-layout.component';

export const routes: Routes = [

    // {
    //     path: 'auth',
    //     loadChildren: () => import('./auth/auth.routes'),
    // },
    {
        path: '',
        component: BaseLayoutComponent,
        // canActivateChild: [ScriptLoaderGuard],
        children: [
            {
                path: '',
                loadChildren: () => import('./modules/app.routes')
            },
        ]
    },
    {
        path: '**',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
];


