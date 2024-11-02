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
  onWait: boolean = false;

  constructor(
    private userService: UserService,
    private rolesService: RolesService
  ) {}

  ngOnInit(): void {
    this.loadDatos();
  }
  async loadDatos() {
    this.onWait = true;
    try {
      this.users = await this.userService.getUsers();
      this.roles = await this.rolesService.getAllRoles();
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
    this.onWait = false;
  }

  openModal(user: User, role: Role): void {
    this.selectedUser = { ...user }; 
    this.selectedRol = role; 
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
          this.loadDatos();
          this.closeModal();
        },
        error: (err) => {
          console.error('Error al actualizar rol del usuario:', err);
        }
      });
    }
  }
}
