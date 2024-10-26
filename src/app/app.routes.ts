import { Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component').then(m => m.DashboardComponent),
                canActivate: [AuthGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component').then(m => m.ProfileComponent),
                canActivate: [AuthGuard]
            },
            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: 'registrarse', component: RegisterComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'iniciarSesion', component: LoginComponent,
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'

    }
];
