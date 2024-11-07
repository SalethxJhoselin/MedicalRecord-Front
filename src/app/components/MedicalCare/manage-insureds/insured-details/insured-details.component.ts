import { Component } from '@angular/core';
import { InsuredGet, InsuredService } from '../../../../core/services/clinical-management/insureds.service';
import { Record, RecordService } from '../../../../core/services/clinical-management/records.service';
import { ActivatedRoute } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-insured-details',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './insured-details.component.html',
  styleUrls: ['./insured-details.component.css']
})
export class InsuredDetailsComponent {
  insured: InsuredGet | null = null;
  records: Record[] = [];
  insuredId: number;
  onWait: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private insuredService: InsuredService,
    private recordService: RecordService
  ) {
    this.insuredId = +this.route.snapshot.paramMap.get('id')!;
  }

  async ngOnInit() {
    this.onWait = true;
    try {
      await this.loadInsuredDetails();
      await this.loadRecords();
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

  editInsured() {
  }

  addRecord() {
  }

  editRecord(recordId: number) {
  }

  deleteRecord(recordId: number) {
  }
}
