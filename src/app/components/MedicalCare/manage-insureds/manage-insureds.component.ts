import { Component } from '@angular/core';
import { InsuredGet, InsuredPost, InsuredService } from '../../../core/services/clinical-management/insureds.service';
import { NgFor, NgIf } from '@angular/common';
import { Record, RecordService } from '../../../core/services/clinical-management/records.service';
import { RouterModule } from '@angular/router';
import { User, UserService } from '../../../core/services/Users/users.service';
import { FormsModule } from '@angular/forms';
import {  MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-manage-insureds',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule,FormsModule,MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './manage-insureds.component.html',
  styleUrl: './manage-insureds.component.css'
})
export class ManageInsuredsComponent {
  insureds: InsuredGet[] = []
  users: User [] = []
  newInsured: InsuredPost = {}
  selectInsuredId: number | null= null
  records: Record[] = []

  showCreateModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  onWait: boolean = false

  constructor(
    private insuredServices: InsuredService,
    private recordServices: RecordService,
    private userServices: UserService
  ){}

  ngOnInit(): void{
    this.loadDates()
  }
  async loadDates() {
    this.onWait = true
    try {
      this.insureds = await this.insuredServices.getInsureds()
      this.users = await this.userServices.getUsers()
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
    this.onWait = false
  }

  async getRecord(id: number){
    try {
      this.records = await this.recordServices.getRecordsByUser(id)
      console.log(this.records)
    } catch (error) {
      console.error('Error al cargar los datos:', error);
    }
  }

  async createInsured(){
    if (this.newInsured != null) {
      try {
        await this.insuredServices.createInsured(this.newInsured)
        console.log(this.newInsured)
        this.loadDates();
        this.newInsured = {};
      } catch (error) {
        console.error("Error al crear asegurado", error)
      }
    }
  }

  async deleteInsured(){
    if (this.selectInsuredId != null) {
      try {
        await this.insuredServices.deleteInsured(this.selectInsuredId)
        this.selectInsuredId = null
      } catch (error) {
        console.error("Error al eliminar el asegurado", error)
      }
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
