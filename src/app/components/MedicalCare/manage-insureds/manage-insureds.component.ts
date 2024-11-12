import { Component } from '@angular/core';
import { InsuredGet, InsuredPost, InsuredService } from '../../../core/services/clinical-management/insureds.service';
import { NgFor, NgIf } from '@angular/common';
import { Record, RecordService } from '../../../core/services/clinical-management/records.service';
import { RouterModule } from '@angular/router';
import { User, UserService } from '../../../core/services/Users/users.service';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { HttpClient } from '@angular/common/http';
import { format } from 'date-fns';
import { BitacoraPost, BitacoraService, Ip } from '../../../core/services/Users/bitacora.service';

@Component({
  selector: 'app-manage-insureds',
  standalone: true,
  imports: [NgFor, NgIf, RouterModule, FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './manage-insureds.component.html',
  styleUrl: './manage-insureds.component.css'
})
export class ManageInsuredsComponent {
  insureds: InsuredGet[] = []
  insuredFilter: String = ''
  filteredInsureds: InsuredGet[] = []
  users: User[] = []
  newInsured: InsuredPost = {}
  selectInsuredId: number | null = null
  records: Record[] = []

  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  onWait: boolean = false
  ip: Ip = {}

  constructor(
    private insuredServices: InsuredService,
    private recordServices: RecordService,
    private userServices: UserService,
    private bitacoraService: BitacoraService
  ) { }

  ngOnInit(): void {
    this.loadDates()
    console.log(localStorage.getItem('user'))
  }
  async loadDates() {
    this.onWait = true
    try {
      this.insureds = await this.insuredServices.getInsureds()
      this.users = await this.userServices.getUsers()
      this.filteredInsureds = this.insureds
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
    this.onWait = false
  }

  async addBitacoraEntry(action: string, table: string) {
    this.ip = await this.bitacoraService.getIp();
    const currentDate = new Date();

    const fecha = format(currentDate, 'yyyy-MM-dd');
    const hora = format(currentDate, 'HH:mm:ss');

    const bitacoraEntry: BitacoraPost = {
      ip: this.ip.ip,
      usuario: localStorage.getItem('user') || 'Usuario desconocido',
      fecha: fecha,
      hora: hora,
      accion: action,
      tablaAfectada: table
    };

    try {
      console.log(bitacoraEntry)
      await this.bitacoraService.createBitacora(bitacoraEntry);
      console.log(`Registro de bitácora añadido: ${action} en ${table}`);
    } catch (error) {
      console.error("Error al agregar a la bitácora:", error);
    }
  }



  async getRecord(id: number) {
    try {
      this.records = await this.recordServices.getRecordsByUser(id)
      console.log(this.records)
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  async createInsured() {
    if (this.newInsured != null) {
      try {
        await this.insuredServices.createInsured(this.newInsured)
        console.log(this.newInsured)
        this.loadDates();
        this.newInsured = {};
        await this.addBitacoraEntry('Se creo un nuevo asegurado', 'Asegurados')
      } catch (error) {
        console.error("Error al crear asegurado", error)
      }
    }
  }

  async deleteInsured() {
    if (this.selectInsuredId != null) {
      try {
        await this.insuredServices.deleteInsured(this.selectInsuredId)
        await this.addBitacoraEntry('Se elimino un nuevo asegurado', 'Asegurados')
        this.selectInsuredId = null
      } catch (error) {
        console.error("Error al eliminar el asegurado", error)
      }
    }
  }

  applyFilters() {
    if (this.insuredFilter != null) {
      const filterValue = this.insuredFilter.toLowerCase();
      this.filteredInsureds = this.insureds.filter(service =>
        service.nombre?.toLowerCase().includes(filterValue)
      );
    }
  }

  getAvailableUsers() {
    return this.users.filter(user => !this.insureds.some(insured => insured.id_usuario === user.id));
  }

  confirmDelete(insured: any) {
    this.selectInsuredId = insured.id
    this.showDeleteModal = true;
  }

  cancelDelete() {
    this.selectInsuredId = null
    this.showDeleteModal = false;
  }

  openCreateModal() {
    this.showCreateModal = true;
  }

  closeCreateModal() {
    this.showCreateModal = false;
  }
}
