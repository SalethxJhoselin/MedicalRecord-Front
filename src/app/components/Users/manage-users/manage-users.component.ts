import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';

import {  RolesService } from '../../../core/services/Users/roles.service';
import { FormsModule } from '@angular/forms';
import { Role, User, UserService } from '../../../core/services/Users/users.service';

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [NgFor,NgIf,FormsModule],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent {
  users: User[] = [];
  roles: Role[] = [];
  isModalOpen = false;
  selectedUser: User | null = null;
  selectedRol: Role | null = null;

  constructor(
    private userService: UserService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.loadUsers();
    this.loadRoles();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  loadRoles(): void {
    this.rolesService.getAllRoles().subscribe({
      next: (data) => {
        this.roles = data;
      },
      error: (err) => {
        console.error('Error al cargar roles:', err);
      }
    });
  }

  openModal(user: User, role: Role): void {
    this.selectedUser = { ...user }; 
    this.selectedRol = role; // Asigna directamente el objeto Role
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.selectedUser = null;
  }

  saveChanges(): void {
    console.log(this.selectedRol?.id);
    console.log(this.selectedRol?.name);
    if (this.selectedUser && this.selectedRol) {
      this.userService.setRolUser(this.selectedUser.id, this.selectedRol).subscribe({
        next: () => {
          this.loadUsers(); // Recargar la lista de usuarios después de la edición
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al actualizar rol del usuario:', err);
        }
      });
    }
  }
}
