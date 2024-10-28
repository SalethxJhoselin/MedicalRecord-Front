import { NgFor } from '@angular/common';
import { Component } from '@angular/core';

interface Specialty {
  id: number;
  nombre: string;
  descripcion: string;
}

@Component({
  selector: 'app-manage-specialties',
  standalone: true,
  imports: [NgFor],
  templateUrl: './manage-specialties.component.html',
  styleUrl: './manage-specialties.component.css'
})

export class ManageSpecialtiesComponent {
  specialties: Specialty[] = [
    { id: 1, nombre: 'Oftalmología', descripcion: 'Especialidad médica que se encarga del diagnóstico y tratamiento de enfermedades oculares.' },
    { id: 2, nombre: 'Optometría', descripcion: 'Ciencia encargada de medir defectos visuales y adaptar lentes correctoras' },
    { id: 3, nombre: 'Cirugía Refractiva', descripcion: 'Especialidad que corrige los problemas de refracción del ojo mediante cirugía' },
    { id: 4, nombre: 'Retina', descripcion: 'Rama de la oftalmología que se enfoca en el diagnóstico y tratamiento de enfermedades de la retina' },
    { id: 5, nombre: 'Pediatría Oftalmológica', descripcion: 'Especialidad que trata las enfermedades oculares en niños' }
  ];

  constructor() {}

  ngOnInit(): void {}

  editSpecialty(specialtyId: number) {
    console.log('Editar especialidad con ID:', specialtyId);
  }

  deleteSpecialty(specialtyId: number) {
    console.log('Eliminar especialidad con ID:', specialtyId);
  }
}