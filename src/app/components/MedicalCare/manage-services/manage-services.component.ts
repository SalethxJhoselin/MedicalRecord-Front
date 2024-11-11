import { Component } from '@angular/core';
import { Service, ServiceCreate, Services } from '../../../core/services/MedicalCare/services.service';
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
  selectedFile: File | null = null;
  selectedServiceId: number | null = null;

  newService: ServiceCreate = {};
  idSpecialty: number | null = null;
  filteredServices: Service[] = [];
  userFilter: string = '';
  onWait: boolean = false;

  showCreateModal: boolean = false;
  showDeleteModal: boolean = false;
  showEditModal: boolean = false;


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

  async uploadImage(file: File): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Clinica');

    const response = await fetch('https://api.cloudinary.com/v1_1/drugalhsm/image/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.secure_url;
  }


  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  async createService() {
    try {
      if (this.selectedFile) {
        const imageUrl = await this.uploadImage(this.selectedFile);
        this.newService.imagen = imageUrl;
      }

      await this.service.createOrUpdateService(this.newService);
      this.loadDates();
      this.newService = {};
      this.selectedFile = null;
    } catch (error) {
      console.error('Error al crear el servicio', error);
    }
  }

  
  async deleteService(selectedServiceId: number | null) {
    if (selectedServiceId != null) {
      try {
        await this.service.deleteService(selectedServiceId);
        this.loadDates();
        this.showDeleteModal = false; 
        this.selectedServiceId = null; 
      } catch (error) {
        console.error('Error al eliminar el servicio', error);
      }
    }
  }
  
  
  async editService(service: Service) {

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
  
  openCreateModal() {
    this.showCreateModal = true;
  }
  
  closeCreateModal() {
    this.showCreateModal = false;
  }

  openEditModal(service: Service) {
    this.newService.id = service.id
    this.newService.nombre = service.nombre
    this.newService.descripcion = service.descripcion
    this.newService.precio = service.precio
    this.newService.imagen = service.imagen
    this.newService.duracion = service.duracion
    this.newService.especialidad = service.especialidad?.id
    this.showEditModal = true;
  }
  
  closeEditModal() {
    this.showEditModal = false;
    this.newService = {}
  }

  confirmDelete(service: any) {
    this.selectedServiceId = service.id;
    this.showDeleteModal = true;
  }
  
  cancelDelete() {
    this.showDeleteModal = false;
    this.selectedServiceId = null;
  }
}
