import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiConfigService {
  readonly railwayUrl: string = 'http://localhost:8080/';
  constructor() { }
}
