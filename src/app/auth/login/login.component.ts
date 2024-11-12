import { Component } from '@angular/core';
import { AuthService } from '../../core/services/Users/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { BitacoraService } from '../../core/services/Users/bitacora.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router,
    private bitacoraService: BitacoraService
  ) {

  }
  async login(): Promise<void> {
    //console.log(this.user,this.password,"a ver si esto si lo muestra");
    try {
      this.authService.login(this.username, this.password).subscribe({
        next: () => this.router.navigate(['/dashboard']),
        error: (err) => console.error('Login failed', err)
      })
      await this.bitacoraService.addBitacoraEntry('El usuario inicio sesion', 'Login')
    } catch (error) {
      
    }
  }
}
