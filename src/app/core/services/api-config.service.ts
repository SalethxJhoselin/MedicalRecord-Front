import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  readonly baseUrl: string = 'https://medicalrecord-backend.onrender.com';
  constructor() { }
}
