import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorService, Doctor } from '../../../core/services/clinical-management/doctors.service';
import { SpecialtieService, Specialty } from '../../../core/services/clinical-management/specialties.service';
import { User, UserService } from '../../../core/services/Users/users.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [NgFor,FormsModule,NgIf],
  templateUrl: './manage-doctors.component.html',
  styleUrl: './manage-doctors.component.css'
})

export class ManageDoctorsComponent {
  doctors: Doctor[] = [];
  specialties: Specialty[] = [];
  users: User[] = [];
  selectedUserId: number | null = null;
  selectedSpecialtyId: number | null = null;
  onWait: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadDatos();
  }
  async loadDatos() {
    this.onWait = true;
    try {
      this.users = await this.userService.getUsers();
      this.doctors = await this.doctorService.getDoctors();
      this.specialties = await this.specialtyService.getSpecialties();
    } catch (error) {
      console.error('Error al cargar permisos o roles:', error);
    }
    this.onWait = false;
  }
  

  createDoctor(): void {
    if (this.selectedUserId && this.selectedSpecialtyId) {
      const doctorData = {
        personaId: this.selectedUserId,
        especialidadId: this.selectedSpecialtyId
      };
      this.doctorService.createDoctor(doctorData).subscribe({
        next: () => {
          console.log('Doctor creado exitosamente');
          this.loadDatos();
        },
        error: (err) => {
          console.error('Error al crear el doctor:', err);
        }
      });
    } else {
      console.error('Por favor seleccione un usuario y una especialidad');
    }
  }

  editDoctor(doctorId: number) {
    console.log('Editar doctor con ID:', doctorId);
  }

  deleteDoctor(doctorId: number) {
    this.doctorService.deleteDoctor(doctorId).subscribe({
    next: () => {
      this.doctors = this.doctors.filter(doctor => doctor.id !== doctorId);
      console.log('Doctor eliminado con ID:', doctorId);
    },
    error: (err) => {
      console.error('Error al eliminar doctor:', err);
    }
  });
  }
}
