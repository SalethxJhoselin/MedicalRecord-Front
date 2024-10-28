import { Routes } from '@angular/router';
import { ProfileComponent } from './components/Users/profile/profile.component';
import { RegisterComponent } from './components/Users/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { ManageRolesComponent } from './components/Users/manage-roles/manage-roles.component';
import { ManagePermissionsComponent } from './components/Users/manage-permissions/manage-permissions.component';

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
                path: 'perfil',
                component: ProfileComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'registrar',
                component: RegisterComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'roles',
                component: ManageRolesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'permisos',
                component: ManagePermissionsComponent,
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
        path: 'iniciarSesion',
        component: LoginComponent,
        canActivate: [AuthenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'dashboard'
    }
];
