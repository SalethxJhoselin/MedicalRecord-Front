// src/app/components/manage-specialties/manage-specialties.component.ts
import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { SpecialtieService, Specialty } from '../../../core/services/clinical-management/specialties.service';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-manage-specialties',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf], 
  templateUrl: './manage-specialties.component.html',
  styleUrls: ['./manage-specialties.component.css']
})
export class ManageSpecialtiesComponent {
  specialties: Specialty[] = [];
  newSpecialty: Specialty = { nombre: '', descripcion: '' }; 
  showSuccessMessage = false;
  showErrorMessage = false;
  onWait: boolean = false;

  constructor(private specialtieService: SpecialtieService) {}

  ngOnInit(): void {
    this.loadSpecialties();
  }

  // Cargar especialidades desde el backend
  async loadSpecialties(): Promise<void> {
    this.onWait = true;
    try {
      this.specialties = await this.specialtieService.getSpecialties();
    } catch (error) {
      console.error('Error al cargar permisos o roles:', error);
    }
    this.onWait = false;
  }

  // Guardar nueva especialidad
  saveSpecialty(): void {
    if (this.newSpecialty.nombre && this.newSpecialty.descripcion) {
      this.specialtieService.saveSpecialty(this.newSpecialty).subscribe({
        next: (savedSpecialty) => {
          this.specialties.push(savedSpecialty);
          this.newSpecialty = { nombre: '', descripcion: '' };
          
          this.showSuccessMessage = true;
          setTimeout(() => {
            this.showSuccessMessage = false;
          }, 3000);//3seg
        },
        error: (err) => {
          console.error('Error al guardar especialidad:', err);
        }
      });
    } else {
      console.warn('Por favor, complete todos los campos.');
    }
  }

  // Editar especialidad
  editSpecialty(specialtyId: number | undefined) {
    if (specialtyId !== undefined) {
      console.log('Editar especialidad con ID:', specialtyId);
    } else {
      console.warn('ID de especialidad no definido');
    }
  }

  // Eliminar especialidad
  deleteSpecialty(specialtyId: number | undefined) {
    if (specialtyId !== undefined) {
      this.specialtieService.deleteSpecialty(specialtyId).subscribe({
        next: () => {
          this.specialties = this.specialties.filter(specialty => specialty.id !== specialtyId);
          console.log('Especialidad eliminada con ID:', specialtyId);
        },
        error: (err) => {
          console.error('Error al eliminar especialidad:', err);
          this.showErrorMessage = true;
          setTimeout(() => {
            this.showErrorMessage = false;
          }, 3000); //3 segundos
        }
      });
    } else {
      console.warn('ID de especialidad no definido');
    }
  }
}
