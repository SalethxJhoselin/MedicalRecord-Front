import { Component } from '@angular/core';
import { InsuredGet, InsuredService } from '../../../core/services/clinical-management/insureds.service';
import { NgFor, NgIf } from '@angular/common';
import { Record, RecordService } from '../../../core/services/clinical-management/records.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-manage-insureds',
  standalone: true,
  imports: [NgFor,NgIf,RouterModule],
  templateUrl: './manage-insureds.component.html',
  styleUrl: './manage-insureds.component.css'
})
export class ManageInsuredsComponent {
  insureds: InsuredGet[] = []
  records: Record[] = []
  onWait: boolean = false

  constructor(
    private insuredServices: InsuredService,
    private recordServices: RecordService
  ){}

  ngOnInit(): void{
    this.loadDates()
  }
  async loadDates() {
    this.onWait = true
    try {
      this.insureds = await this.insuredServices.getInsureds()
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
}
