// src/app/services/users.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface Role {
  id?: number;
  name: string;
}

export interface User {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  direccion: string;
  especialidad: string;
  role: Role;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.url}user`;
  }

  async getUsers(): Promise<User[]> {
    return await lastValueFrom(this.http.get<User[]>(this.apiUrl));
  }

  setRolUser(id: number, role: Role): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/rol/${id}`, role);
  }
}
