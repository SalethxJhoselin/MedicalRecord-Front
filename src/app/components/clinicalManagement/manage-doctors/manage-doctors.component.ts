import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { DoctorService } from '../../../core/services/doctors.service';

interface Doctor {
  id: number;
  usuario: string;
  nombre: string;
  email: string;
  direccion: string;
  especialidad: string;
}

@Component({
  selector: 'app-manage-doctors',
  standalone: true,
  imports: [NgFor],
  templateUrl: './manage-doctors.component.html',
  styleUrl: './manage-doctors.component.css'
})

export class ManageDoctorsComponent {
  doctors: Doctor[] = [];

  constructor(private doctorService: DoctorService) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  loadDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (data) => {
        this.doctors = data;
      },
      error: (err) => {
        console.error('Error al cargar especialidades:', err);
      }
    });
  }

  editDoctor(doctorId: number) {
    console.log('Editar doctor con ID:', doctorId);
  }

  deleteDoctor(doctorId: number) {
    console.log('Eliminar doctor con ID:', doctorId);
  }
}
