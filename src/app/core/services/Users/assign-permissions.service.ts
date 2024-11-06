import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Permission {
  id: number;
  nombre: string;
}

export interface Role {
  id: number;
  name: string;
  permissions: Permission[];
}

@Injectable({
  providedIn: 'root'
})
export class AssignPermissionsService {
  private apiUrl: string;
  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}`;
  }

  // Obtener lista de permisos
  async fetchPermisos(): Promise<Permission[]> {
    return await lastValueFrom(this.http.get<Permission[]>(`${this.apiUrl}permiso/get-all`));
  }

  // Obtener lista de roles con permisos
  async fetchRoles(): Promise<Role[]> {
     return await lastValueFrom(this.http.get<Role[]>(`${this.apiUrl}rol/get-all`));
  }

  // Asignar permisos a un rol específico
  async setPermissions(roleId: number, permissions: { id: number }[]): Promise<void> {
    const payload = { permissions: permissions.map(p => ({ id: p.id })) };
    console.log(roleId, "rol va primero y luego permisos", payload, "permissions en el servicio");
    await lastValueFrom(this.http.put<void>(`${this.apiUrl}rol/${roleId}`, payload));
  }

}
