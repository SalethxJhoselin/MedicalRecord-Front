import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface TratamientoCreate{
    descripcion?:String,
    fecha_inicio?:Date,
    fecha_fin?:Date,
    resultados?:String,
    estado?:String,
    id_atencion?:number
}

@Injectable({
    providedIn: 'root'
})

export class TratamientoService {
    private apiUrl: string;

    constructor(
        private http: HttpClient,
        private apiConfigService: ApiConfigService
    ) {
        this.apiUrl = `${this.apiConfigService.url}tratamientos`;
    }

    async getAllTratamientos(): Promise<any[]>{
        return lastValueFrom(this.http.get<any[]>(this.apiUrl));
    }

    async getTratamientosByAtencion(id:number): Promise<any[]>{
        return lastValueFrom(this.http.get<any[]>(`${this.apiUrl}/atencion/${id}`));
    }

    async createTratamiento(tratamiento:TratamientoCreate): Promise<TratamientoCreate>{
        return lastValueFrom(this.http.post<TratamientoCreate>(this.apiUrl,tratamiento))
    }


}