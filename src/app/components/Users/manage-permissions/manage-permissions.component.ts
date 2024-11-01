import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AssignPermissionsService, Permission, Role } from '../../../core/services/Users/assign-permissions.service';
@Component({
  selector: 'app-manage-permissions',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './manage-permissions.component.html',
  styleUrl: './manage-permissions.component.css'
})
export class ManagePermissionsComponent {
  roles: Role[] = [];
  permissions: Permission[] = [];
  selectedRoleId: number | null = null;
  rolePermissions: number[] = [];
  showSuccessMessage = false;
  showErrorMessage = false;
  onWait: boolean = false;
  constructor(private assignPermissionsService: AssignPermissionsService) { }

  ngOnInit(): void {
    this.getDatos();
  }
  // Obtener roles y permisos del backend
  async getDatos(): Promise<void> {
    this.onWait = true;
    try {
      this.permissions = await this.assignPermissionsService.fetchPermisos();
      this.roles = await this.assignPermissionsService.fetchRoles();
      console.log(this.permissions, "permisos dentro del componente");
      console.log(this.roles, "roles dentro del componente");
    } catch (error) {
      console.error('Error al cargar permisos o roles:', error);
    }
    this.onWait = false;
  }
  // Cambiar el rol seleccionado y actualizar los permisos
  handleRoleChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    const roleId = target.value ? +target.value : null;
    this.selectedRoleId = roleId;
    const selectedRole = this.roles.find((role) => role.id === roleId);
    this.rolePermissions = selectedRole ? selectedRole.permissions.map((p) => p.id) : [];
  }

  // Cambiar permisos del rol seleccionado
  handlePermissionChange(permissionId: number): void {
    if (this.rolePermissions.includes(permissionId)) {
      this.rolePermissions = this.rolePermissions.filter(id => id !== permissionId);
    } else {
      this.rolePermissions = [...this.rolePermissions, permissionId];
    }
  }

  // Guardar permisos en el backend
  async handleSavePermissions(): Promise<void> {
    if (!this.selectedRoleId) return;

    const updatedRolePermissions = this.rolePermissions.map(id => ({ id }));
    try {
      await this.assignPermissionsService.setPermissions(this.selectedRoleId, updatedRolePermissions);
      this.showSuccessMessage = true;
      await this.getDatos();
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
    } catch (error) {
      console.error('Error al realizar la asignacion:', error);
      this.showErrorMessage = true;
      setTimeout(() => {
        this.showErrorMessage = false;
      }, 2000);
    }
    await this.getDatos();
  }
}