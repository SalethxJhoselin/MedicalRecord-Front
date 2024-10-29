import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorService, Doctor } from '../../../core/services/doctors.service';
import { SpecialtieService, Specialty } from '../../../core/services/specialties.service';
import { User, UserService } from '../../../core/services/users.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [NgFor,FormsModule],
  templateUrl: './manage-doctors.component.html',
  styleUrl: './manage-doctors.component.css'
})

export class ManageDoctorsComponent {
  doctors: Doctor[] = [];
  specialties: Specialty[] = [];
  users: User[] = [];
  selectedUserId: number | null = null;
  selectedSpecialtyId: number | null = null;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtieService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecialties();
    this.loadUsers();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error('Error al cargar doctores:', err);
      }
    });
  }

  loadSpecialties(): void {
    this.specialtyService.getSpecialties().subscribe({
      next: (data) => {
        this.specialties = data;
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
      }
    });
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

  createDoctor(): void {
    if (this.selectedUserId && this.selectedSpecialtyId) {
      const doctorData = {
        personaId: this.selectedUserId,
        especialidadId: this.selectedSpecialtyId
      };
      this.doctorService.createDoctor(doctorData).subscribe({
        next: () => {
          console.log('Doctor creado exitosamente');
          this.loadDoctors();
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
    console.log('Eliminar doctor con ID:', doctorId);
  }
}
