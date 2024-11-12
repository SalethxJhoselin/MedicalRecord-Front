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
        const payloadBase64 = token.split('.')[1];
        const payload = JSON.parse(atob(payloadBase64));

        localStorage.setItem('user', payload.usuario);
        localStorage.setItem('userId', payload.id);
        localStorage.setItem('userPermissions', JSON.stringify(payload.Permisos));
    }

    private getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    getTokenPayload(): any | null {
        const token = this.getToken();
        if (!token) {
            return null;
        }
        const payloadBase64 = token.split('.')[1];
        try {
            return JSON.parse(atob(payloadBase64));
        } catch (e) {
            console.error("Error al decodificar el token:", e);
            return null;
        }
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
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
        localStorage.removeItem('userPermissions');
        this.router.navigate(['/iniciarSesion']);
    }
}
