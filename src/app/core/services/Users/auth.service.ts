import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { ApiConfigService } from '../api-config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private LOGIN_URL: string;
    private tokenKey = 'authToken';

    constructor(
        private httpClient: HttpClient,
        private router: Router,
        private apiConfig: ApiConfigService
    ) {
        this.LOGIN_URL = `${this.apiConfig.url}auth/login`;
    }

    login(username: string, password: string): Observable<any> {
        console.log(username, password);
        return this.httpClient.post<any>(this.LOGIN_URL, { username, password }).pipe(
            tap(response => {
                if (response.token) {
                    this.setToken(response.token);
                    console.log(response.token);
                }
            })
        );
    }

    private setToken(token: string): void {
        localStorage.setItem(this.tokenKey, token);
    }

    private getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) {
            return false;
        }
        const payload = JSON.parse(atob(token.split('.')[1]));
        const exp = payload.exp * 1000;
        return Date.now() < exp;
    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/iniciarSesion']);
    }
}
