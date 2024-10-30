import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

export interface User{
  nombre:string;
  username:string;
  email:string;
  adress:string;
  password:string;
  confirmPassword?:string;
}


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl: string;

  constructor(
    private http: HttpClient,
    private apiConfigService: ApiConfigService
  ) {
    this.apiUrl = `${this.apiConfigService.railwayUrl}auth/register`;
  }

  registerUser(user:User):Observable<User>{
    console.log("en service",user);
    return this.http.post<User>(this.apiUrl,user);
  }
}
