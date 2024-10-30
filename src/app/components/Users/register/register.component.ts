import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RegisterService, User } from '../../../core/services/Users/register.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  newUser: User = {
    nombre: '',
    username: '',
    adress: '',
    confirmPassword: '',
    email: '',
    password: ''
  };
  showSuccessMessage = false;
  showErrorMessage = false;
  passwordMismatchError = false;
  emailInvalidError = false;

  constructor(private registerService: RegisterService) { }

  saveUser(): void {
    this.passwordMismatchError = false;
    this.showErrorMessage = false;
    this.emailInvalidError = false;

    if (this.newUser.nombre && this.newUser.username && this.newUser.password) {

      const userToSave = { ...this.newUser };
      delete userToSave.confirmPassword;

      if (this.newUser.password.length < 4 || this.newUser.password !== this.newUser.confirmPassword) {
        this.passwordMismatchError = true;
        return;
      }

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(this.newUser.email)) {
        this.emailInvalidError = true;
        return;
      }
      console.log("antes de guarda lo de usario?", userToSave);
      this.registerService.registerUser(userToSave).subscribe({
        next: () => {
          this.newUser = {
            nombre: '',
            username: '',
            adress: '',
            confirmPassword: '',
            email: '',
            password: ''
          };
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Error al registrar usuario:', err);
          this.showErrorMessage = true;
        }
      });
    } else {
      console.error('Complete todos los campos');
      this.showErrorMessage = true;
    }
  }


}
