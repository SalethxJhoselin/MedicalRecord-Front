import { Component } from '@angular/core';
import { InsuredGet, InsuredService } from '../../../../core/services/clinical-management/insureds.service';
import { Record, RecordService } from '../../../../core/services/clinical-management/records.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User, UserService } from '../../../../core/services/Users/users.service';
import { BitacoraService } from '../../../../core/services/Users/bitacora.service';

@Component({
  selector: 'app-insured-details',
  standalone: true,
  imports: [NgFor, NgIf,FormsModule,MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './insured-details.component.html',
  styleUrls: ['./insured-details.component.css']
})
export class InsuredDetailsComponent {
  insured: InsuredGet = {};
  users: User[] = [];
  selectedRecord: Record = {};
  records: Record[] = [];
  insuredId: number;

  onWait: boolean = false;
  showCreateModal: boolean = false;
  showEditRecordModal: boolean = false;
  showEditInsuredModal: boolean = false;
  showDeleteModal: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private insuredService: InsuredService,
    private recordService: RecordService,
    private userService: UserService,
    private bitacoraService: BitacoraService
  ) {
    this.insuredId = +this.route.snapshot.paramMap.get('id')!;
  }

  async ngOnInit() {
    this.onWait = true;
    try {
      await this.loadInsuredDetails();
      await this.loadRecords();
      this.users = await this.userService.getUsers()
    } catch (error) {
      console.error(error);
    }
    this.onWait = false;
  }

  async loadInsuredDetails() {
    this.insured = await this.insuredService.getInsuredById(this.insuredId);
  }

  async loadRecords() {
    this.records = await this.recordService.getRecordsByUser(this.insuredId);
  }

  async editInsured() {
    if (this.insured != null) {
      try {
        await this.insuredService.updateInsured(this.insured)
        await this.bitacoraService.addBitacoraEntry('Se edito un asegurado', 'Asegurados')
        this.ngOnInit()
        this.closeEditInsuredModal()
        
      } catch (error) {
        console.error("Error al actualizar el asegurado",error)
      }
    }
  }

  async createRecord() {
    console.log(this.selectedRecord)
    if (this.selectedRecord != null && this.insuredId != null) {
      this.selectedRecord.id_asegurado = this.insuredId
      try {
        await this.recordService.createRecord(this.selectedRecord)
        await this.bitacoraService.addBitacoraEntry('Se creo un nuevo antecedente', 'Antecedentes')
        this.selectedRecord = {}
        this.closeCreateRecordModal()
        this.ngOnInit()
      } catch (error) {
        console.error("Error al crear el antecedente",error)
      }
    }
  }

  async deleteRecord() {
    if (this.selectedRecord.id != null) {
      try {
        await this.recordService.deleteRecord(this.selectedRecord.id)
        await this.bitacoraService.addBitacoraEntry('Se elimino un antecedente', 'Antecedentes')
        this.ngOnInit()
        this.selectedRecord = {}
        this.closeDeleteRecordModal()
      } catch (error) {
        console.error("Error al eliminar el antecedente", error)
      }
    }
  }

  openCreateRecordModal(){
    this.showCreateModal = true;
    console.log(this.selectedRecord)
  }
  openEditRecordModal(record: Record){
    this.showEditRecordModal = true;
    this.selectedRecord = record
  }

  openEditInsuredModal(){
    this.showEditInsuredModal = true;
  }
  openDeleteRecordModal(record: Record){
    this.showDeleteModal = true;
    this.selectedRecord = record
  }

  closeCreateRecordModal(){
    this.showCreateModal = false;
    this.selectedRecord = {}
  }
  closeEditRecordModal(){
    this.showEditRecordModal = false;
    this.selectedRecord = {};
  }

  closeEditInsuredModal(){
    this.showEditInsuredModal = false;
  }
  closeDeleteRecordModal(){
    this.showDeleteModal = false;
    this.selectedRecord = {};
  }
  
}
