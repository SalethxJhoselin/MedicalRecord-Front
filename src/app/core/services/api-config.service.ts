import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  readonly baseUrl: string = 'https://medicalrecord-backend-production.up.railway.app';
  readonly railwayUrl: string = 'https://medicalrecord-backend-production.up.railway.app/';
  constructor() { }
}
