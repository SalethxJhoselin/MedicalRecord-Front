import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RolesService, Role } from '../../../core/services/Users/roles.service';

@Component({
  selector: 'app-manage-roles',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './manage-roles.component.html',
  styleUrl: './manage-roles.component.css'
})
export class ManageRolesComponent implements OnInit {
  roles: Role[] = [];
  newRole: Role = { name: '' };
  showSuccessMessage = false;
  showErrorMessage = false;
  isEditing = false;
  editingRoleId?: number;

  constructor(private rolesService: RolesService) { }

  ngOnInit(): void {
    this.loadRoles();
  }

  async loadRoles(): Promise<void> {
    try {
      this.roles = await this.rolesService.getAllRoles();
    } catch (error) {
      console.error('Error al cargar permisos o roles:', error);
    }
  }

  saveRole(): void {
    if (this.newRole.name) {
      this.rolesService.saveRole(this.newRole).subscribe({
        next: (savedRole) => {
          this.roles.push(savedRole);
          this.newRole = { name: '' };
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Error al guardar rol:', err);
        }
      });
    } else {
      console.warn('Por favor, complete todos los campos.');
    }
  }

  editRole(role: Role): void {
    this.isEditing = true;
    this.newRole = { ...role };
    this.editingRoleId = role.id;
  }

  updateRole(): void {
    if (this.editingRoleId && this.newRole.name) {
      this.rolesService.updateRole(this.editingRoleId, this.newRole).subscribe({
        next: (updatedRole) => {
          const index = this.roles.findIndex(role => role.id === this.editingRoleId);
          if (index !== -1) {
            this.roles[index] = updatedRole;
          }
          this.newRole = { name: '' };
          this.isEditing = false;
          this.editingRoleId = undefined;
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);
        },
        error: (err) => {
          console.error('Error al actualizar rol:', err);
        }
      });
    } else {
      console.warn('Por favor, complete todos los campos.');
    }
  }

  deleteRole(roleId: number | undefined): void {
    if (roleId !== undefined) {
      this.rolesService.deleteRole(roleId).subscribe({
        next: () => {
          this.roles = this.roles.filter(role => role.id !== roleId);
          console.log('Rol eliminado con ID:', roleId);
        },
        error: (err) => {
          console.error('Error al eliminar rol:', err);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000);
        }
      });
    } else {
      console.warn('ID de rol no definido');
    }
  }
}
