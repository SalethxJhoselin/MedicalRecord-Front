import { Component } from '@angular/core';
import { TratamientoService } from '../../../core/services/MedicalCare/tratamiento.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-manage-tratamientos',
  standalone: true,
  imports: [FormsModule,NgIf,NgFor],
  templateUrl: './manage-tratamientos.component.html',
  styleUrl: './manage-tratamientos.component.css'
})
export class ManageTratamientosComponent {
userFilter: any;
applyFilter() {
throw new Error('Method not implemented.');
}
  tratamientos: any[] = []
  onWait: boolean = false;

  constructor(
    private tratamientoService: TratamientoService,
  ) { }

  ngOnInit(): void {
    this.loadTratamientos();
  }

  async loadTratamientos() {
    this.onWait = true;
    try {
      this.tratamientos = await this.tratamientoService.getAllTratamientos()
      console.log(this.tratamientos)
    } catch (error) {

    }
    this.onWait = false;
  }

  async generateReport() {
    try {
      const reportBlob = await this.tratamientoService.generateReport();
      const url = window.URL.createObjectURL(reportBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'reporte_tratamientos.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error al generar el reporte:', error);
      alert('Hubo un error al generar el reporte.');
    }
  }
}
