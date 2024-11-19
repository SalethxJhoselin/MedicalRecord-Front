import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  readonly url: string = 'http://localhost:8080/';
  // render 'https://medicalrecord-backend.onrender.com/';
  //railway https://medicalrecord-backend-production.up.railway.app/
  constructor() { }
}
