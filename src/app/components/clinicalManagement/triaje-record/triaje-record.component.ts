import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AttentionQuotasService } from '../../../core/services/MedicalCare/attention-quotas.service';

@Component({
  selector: 'app-triaje-record',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './triaje-record.component.html',
  styleUrls: ['./triaje-record.component.css']
})
export class TriajeRecordComponent implements OnInit {
  triajeForm: FormGroup;
  isModalVisible: boolean = false;
  reservations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private attentionQuotasService: AttentionQuotasService
  ) {
    this.triajeForm = this.fb.group({
      nombreCompleto: ['', Validators.required],
      numeroDocumento: ['', Validators.required],
      edad: ['', [Validators.required, Validators.min(0)]],
      sexo: ['', Validators.required],
      temperatura: ['', [Validators.required, Validators.min(30), Validators.max(45)]],
      frecuenciaCardiaca: ['', [Validators.required, Validators.min(30), Validators.max(200)]],
      frecuenciaRespiratoria: ['', [Validators.required, Validators.min(10), Validators.max(40)]],
      presionArterial: ['', Validators.required],
      saturacionOxigeno: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      nivelConciencia: ['', Validators.required],
      quejaPrincipal: ['', Validators.required],
      nivelUrgencia: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadReservations();
  }

  async loadReservations() {
    try {
      this.reservations = await this.attentionQuotasService.getReservations();
      console.log('Datos de reservas cargados:', this.reservations);
    } catch (error) {
      console.error('Error al cargar los datos de reservas:', error);
    }
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
    this.triajeForm.reset();
  }

  onSubmit() {
    if (this.triajeForm.valid) {
      const triajeData = this.triajeForm.value;
      console.log('Datos del Triaje:', triajeData);
      this.closeModal();
    } else {
      console.log('Formulario inválido');
    }
  }
}
