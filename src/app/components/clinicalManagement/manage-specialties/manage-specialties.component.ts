// src/app/components/manage-specialties/manage-specialties.component.ts
import { NgFor, NgIf } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { SpecialtieService, Specialty } from '../../../core/services/clinical-management/specialties.service';
import { FormsModule } from '@angular/forms';
import { BitacoraService } from '../../../core/services/Users/bitacora.service';

@Component({
  selector: 'app-manage-specialties',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf],
  templateUrl: './manage-specialties.component.html',
  styleUrls: ['./manage-specialties.component.css']
})
export class ManageSpecialtiesComponent {
  specialties: Specialty[] = [];
  filteredSpecialties: Specialty[] = [];
  specialtyFilter: string = '';
  newSpecialty: Specialty = { nombre: '', descripcion: '' };
  onWait: boolean = false;
  isMobile: boolean = window.innerWidth < 640;

  selectSpecialtyId: number | undefined = undefined;
  selectEditSpecialty: Specialty = { nombre: '', descripcion: '' };
  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private specialtieService: SpecialtieService,private bitacoraService: BitacoraService) { }

  ngOnInit(): void {
    this.loadSpecialties();
  }

  async loadSpecialties(): Promise<void> {
    this.onWait = true;
    try {
      this.specialties = await this.specialtieService.getSpecialties();
      this.applyFilter()
    } catch (error) {
      console.error('Error al cargar permisos o roles:', error);
    }
    this.onWait = false;
  }

  // Guardar nueva especialidad
  async saveSpecialty() {
    if (this.newSpecialty.nombre && this.newSpecialty.descripcion) {
      try {
        await this.specialtieService.saveSpecialty(this.newSpecialty)
        await this.bitacoraService.addBitacoraEntry('Se creo una nueva especialidad', 'Especialidades')
        this.loadSpecialties()
        this.newSpecialty = { nombre: '', descripcion: '' };
      } catch (error) {
        console.error("Error al crear la especialidad", error)
      }
    } else {
      console.warn('Por favor, complete todos los campos.');
    }
  }

  // Editar especialidad
  async editSpecialty() {
    if (this.selectEditSpecialty !== undefined) {
      try {
        await this.specialtieService.editSpecialty(this.selectEditSpecialty)
        await this.bitacoraService.addBitacoraEntry('Se edito una especialidad', 'Especialidades')
        this.selectEditSpecialty = { id: undefined, nombre: '', descripcion: '' };
        this.loadSpecialties()
      } catch (error) {
        console.error("Error al editar la especialidad", error)
      }
    } else {
      console.warn('ID de especialidad no definido');
    }
  }

  // Eliminar especialidad
  async deleteSpecialty() {
    if (this.selectSpecialtyId !== undefined) {
      try {
        await this.specialtieService.deleteSpecialty(this.selectSpecialtyId)
        await this.bitacoraService.addBitacoraEntry('Se elimino una especialidad', 'Especialidades')
        this.loadSpecialties()
        this.showDeleteModal = false
        this.selectSpecialtyId = undefined
      } catch (error) {
        console.error("Error al eliminar la especialidad", error)
      }
    } else {
      console.warn('ID de especialidad no definido');
    }
  }

  applyFilter() {
    this.filteredSpecialties = this.specialties.filter(specialty => {
      return specialty.nombre.toLowerCase().includes(this.specialtyFilter.toLowerCase())
    });
  }

  // Modales
  confirmDelete(specialty: any) {
    this.selectSpecialtyId = specialty.id
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.selectSpecialtyId = undefined
    this.showDeleteModal = false;
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }

  openEditModal(specialty: Specialty) {
    this.selectEditSpecialty = specialty
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.isMobile = event.target.innerWidth < 640;
  }
}
