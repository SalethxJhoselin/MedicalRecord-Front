import { Component } from '@angular/core';
import { Service, Services } from '../../../core/services/MedicalCare/services.service';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SpecialtieService, Specialty } from '../../../core/services/clinical-management/specialties.service';

@Component({
  selector: 'app-manage-services',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  templateUrl: './manage-services.component.html',
  styleUrl: './manage-services.component.css'
})
export class ManageServicesComponent {
  services: Service[] = [];
  specialties: Specialty[] = [];

  newService: Service = {};
  idSpecialty: number |null = null;
  filteredServices: Service[] = [];
  userFilter: string = '';
  onWait: boolean = false;

  constructor(
    private service: Services,
    private specialty: SpecialtieService
  ) { }

  ngOnInit(): void {
    this.loadDates();
  }

  async loadDates() {
    this.onWait = true;
    try {
      this.services = await this.service.getDates();
      this.specialties = await this.specialty.getSpecialties();
      this.filteredServices = this.services;  
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
    this.onWait = false;
  }

  applyFilter() {
    const filterValue = this.userFilter.toLowerCase();
    this.filteredServices = this.services.filter(service =>
      service.nombre?.toLowerCase().includes(filterValue)
    );
  }

  clearFilters() {
    this.userFilter = '';
    this.filteredServices = this.services; 
  }
}
