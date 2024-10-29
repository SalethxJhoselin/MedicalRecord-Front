import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Role {
  id?: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.railwayUrl}rol`;
  }

  // Obtener lista de especialidades
  getAllRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/get-all`);
  }

  // Guardar una nuevo rol
  saveRole(role: Role): Observable<Role> {
    return this.http.post<Role>(`${this.apiUrl}/save`, role);
  }

  // Eliminar un rol
  deleteRole(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  //Editar Rol
  updateRole(id: number, role: Role): Observable<Role> {
    console.log(id,"ver si separa",role,"a ver si muestra")
    return this.http.put<Role>(`${this.apiUrl}/${id}`, {name:role.name});
  }
}
