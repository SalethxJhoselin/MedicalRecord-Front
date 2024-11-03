import { Routes } from '@angular/router';
import { ProfileComponent } from './components/Users/profile/profile.component';
import { RegisterComponent } from './components/Users/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuard } from './core/guards/auth.guard';
import { AuthenticatedGuard } from './core/guards/authenticated.guard';
import { ManageRolesComponent } from './components/Users/manage-roles/manage-roles.component';
import { ManagePermissionsComponent } from './components/Users/manage-permissions/manage-permissions.component';
import { ManageUsersComponent } from './components/Users/manage-users/manage-users.component';
import { ManageSpecialtiesComponent } from './components/clinicalManagement/manage-specialties/manage-specialties.component';
import { ManageDoctorsComponent } from './components/clinicalManagement/manage-doctors/manage-doctors.component';
import { TriajeRecordComponent } from './components/clinicalManagement/triaje-record/triaje-record.component';
import { AttentionQuotasComponent } from './components/MedicalCare/attention-quotas/attention-quotas.component';
import { ProgrammingCalendarComponentComponent } from './components/clinicalManagement/DoctorsHours/programming-calendar-component/programming-calendar-component.component';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component').then(m => m.LayoutComponent),
        children: [
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
                path: 'usuarios',
                component: ManageUsersComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'especialidades',
                component: ManageSpecialtiesComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'medicos',
                component: ManageDoctorsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'triaje',
                component: TriajeRecordComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'horariosMedicos',
                component: ProgrammingCalendarComponentComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'fichaAtencion',
                component: AttentionQuotasComponent,
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
