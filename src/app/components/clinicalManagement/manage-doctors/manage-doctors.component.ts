import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

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
  doctors: Doctor[] = [
    { id: 1, usuario: 'ADMIN', nombre: 'Saleth Jhoselin Mamani', email: 'saleth@gmail.com', direccion: '', especialidad: 'Oftalmología' },
    { id: 2, usuario: 'ADMIN', nombre: 'Jhon Said Andia', email: 'jhademels123@gmail.com', direccion: '', especialidad: 'Optometría' }
  ];

  constructor() {}

  ngOnInit(): void {}

  editDoctor(doctorId: number) {
    console.log('Editar doctor con ID:', doctorId);
  }

  deleteDoctor(doctorId: number) {
    console.log('Eliminar doctor con ID:', doctorId);
  }
}
