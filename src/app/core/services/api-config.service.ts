import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  readonly railwayUrl: string = 'https://medicalrecord-backend-production.up.railway.app/';
  constructor() { }
}
