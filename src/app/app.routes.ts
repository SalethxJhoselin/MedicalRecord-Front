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
import { ManageBitacoraComponent } from './components/Users/manage-bitacora/manage-bitacora.component';
import { TriajeRecordComponent } from './components/clinicalManagement/triaje-record/triaje-record.component';
import { AttentionQuotasComponent } from './components/MedicalCare/attention-quotas/attention-quotas.component';
import { ManageServicesComponent } from './components/MedicalCare/manage-services/manage-services.component';
import { ManageInsuredsComponent } from './components/MedicalCare/manage-insureds/manage-insureds.component';
import { InsuredDetailsComponent } from './components/MedicalCare/manage-insureds/insured-details/insured-details.component';
import { ProgrammingCalendarComponentComponent } from './components/clinicalManagement/DoctorsHours/programming-calendar-component/programming-calendar-component.component';
import { ManageAttentionComponent } from './components/MedicalCare/manage-attention/manage-attention.component';
import { ManageMedicalEmergencyComponent } from './components/clinicalManagement/manage-medical-emergency/manage-medical-emergency.component';
import { ManageTratamientosComponent } from './components/MedicalCare/manage-tratamientos/manage-tratamientos.component';
import { EstadisticasComponent } from './estadisticas/estadisticas.component';

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
                path: 'estadisticas',
                component: EstadisticasComponent,
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
                path: 'bitacora',
                component: ManageBitacoraComponent,
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
                path: 'servicios',
                component: ManageServicesComponent,
                canActivate: [AuthGuard]
            },

            {
                path: 'atenciones',
                component: ManageAttentionComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'asegurados',
                component: ManageInsuredsComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'asegurados/:id',
                component: InsuredDetailsComponent,
            },
            {
                path: 'emergencia',
                component: ManageMedicalEmergencyComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'tratamientos',
                component: ManageTratamientosComponent,
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
