import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DoctorService, Doctor } from '../../../../core/services/clinical-management/doctors.service';

@Component({
  selector: 'app-specialists-table-search-component',
  standalone: true,
  imports: [NgFor, NgIf, NgClass, FormsModule],
  templateUrl: './specialists-table-search-component.component.html',
  styleUrl: './specialists-table-search-component.component.css'
})
export class SpecialistsTableSearchComponentComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  search: string = '';
  selectedDoctorId: number | null = null;

  @Output() selectDoctor = new EventEmitter<Doctor>();

  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.fetchDoctors();
  }

  fetchDoctors(): void {
    this.doctorService.getDoctors().subscribe({
      next: (doctors) => {
        this.doctors = doctors;
        this.filteredDoctors = doctors;
      },
      error: (error) => console.error('Error al obtener los Especialistas - Medicos - Doctores:', error),
    });
    console.log("lista de doctores", this.doctors)
  }

  handleSearch(): void {
    this.filteredDoctors = this.doctors.filter((doctor) =>
      doctor.nombre
        .toLowerCase()
        .includes(this.search.toLowerCase())
    );
  }
  handleRowClick(doctor: Doctor): void {
    this.selectedDoctorId = doctor.id;
    console.log("Id seleccionado", this.selectedDoctorId)
    this.selectDoctor.emit(doctor);
  }
}