import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorService, Doctor } from '../../../core/services/clinical-management/doctors.service';
import { SpecialtieService, Specialty } from '../../../core/services/clinical-management/specialties.service';
import { User, UserService } from '../../../core/services/Users/users.service';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatOption } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';


@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, MatFormField, MatLabel, MatOption, MatSelectModule],
  templateUrl: './manage-doctors.component.html',
  styleUrl: './manage-doctors.component.css'
})

export class ManageDoctorsComponent {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  specialties: Specialty[] = [];
  users: User[] = [];
  selectedUserId: number | null = null;
  selectedDoctorId: number | null = null;
  selectedSpecialtyId: number | null = null;
  nameFilter: string = ''

  onWait: boolean = false;

  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;

  constructor(
    private doctorService: DoctorService,
    private specialtyService: SpecialtieService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.loadDatos();
  }
  async loadDatos() {
    this.onWait = true;
    try {
      this.users = await this.userService.getUsers();
      this.doctors = await this.doctorService.getDoctors();
      this.specialties = await this.specialtyService.getSpecialties();
      console.log(this.doctors)

      this.applyFilter()
    } catch (error) {
      console.error('Error al cargar permisos o roles:', error);
    }
    this.onWait = false;
  }


  async createDoctor() {
    if (this.selectedUserId && this.selectedSpecialtyId) {
      try {
        const doctorData = {
          personaId: this.selectedUserId,
          especialidadId: this.selectedSpecialtyId
        };
        await this.doctorService.createDoctor(doctorData)
        console.log('Doctor creado exitosamente');
        this.loadDatos();

      } catch (error) {
        console.error('Error al crear el doctor:', error);
      }
    } else {
      console.error('Por favor seleccione un usuario y una especialidad');
    }
  }

  editDoctor(doctorId: number) {
    console.log('Editar doctor con ID:', doctorId);
  }

  async deleteDoctor(doctorId: number | null) {
    if (doctorId != null) {
      try {
        await this.doctorService.deleteDoctor(doctorId);
        this.loadDatos()
        this.selectedDoctorId = null
        this.showDeleteModal = false
      } catch (error) {
        console.error('Error al eliminar doctor:', error);
      }

    }
  }

  applyFilter() {
    this.filteredDoctors = this.doctors.filter(doctor => {
      return doctor.nombre.toLowerCase().includes(this.nameFilter.toLowerCase())
    });
  }
  // Modales
  confirmDelete(doctor: any) {
    this.selectedDoctorId = doctor.id
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.selectedDoctorId = null
    this.showDeleteModal = false;
  }


  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
}
