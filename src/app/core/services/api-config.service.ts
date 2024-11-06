import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  readonly url: string = 'https://medicalrecord-backend.onrender.com/';
  // render 'https://medicalrecord-backend.onrender.com/';
  //railway https://medicalrecord-backend-production.up.railway.app/
  constructor() { }
}
