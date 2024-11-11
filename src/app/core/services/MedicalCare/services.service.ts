import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';
import { Specialty } from '../clinical-management/specialties.service';

export interface Service {
    id?: number,
    nombre?: String,
    descripcion?: String,
    precio?: number,
    imagen?: String,
    duracion?: number,
    especialidad?: Specialty
}

export interface ServiceCreate {
    id?: number,
    nombre?: String,
    descripcion?: String,
    precio?: number,
    imagen?: String,
    duracion?: number,
    especialidad?: number
}

@Injectable({
    providedIn: 'root'
})

export class Services {
    private apiUrl: string;

    constructor(
        private http: HttpClient,
        private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${this.apiConfigService.url}services`;
    }

    async getDates(): Promise<Service[]> {
        return await lastValueFrom(this.http.get<Service[]>(this.apiUrl))
    }

    async createOrUpdateService(service: ServiceCreate): Promise<ServiceCreate>{
        return await lastValueFrom(this.http.post<ServiceCreate>(this.apiUrl,service))
    }

    async deleteService(serviceId: number): Promise<void>{
        return await lastValueFrom(this.http.delete<void>(`${this.apiUrl}/${serviceId}`))
    }
}