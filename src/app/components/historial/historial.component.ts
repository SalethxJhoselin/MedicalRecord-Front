import { Component, OnInit } from '@angular/core';
import { InsuredGet, InsuredService } from '../../core/services/clinical-management/insureds.service';
import { HistorialService } from '../../core/services/historial.service';
import { NgFor, NgIf } from '@angular/common';
@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  insureds: InsuredGet[] = []; // Lista de asegurados

  constructor(
    private insuredService: InsuredService,
    private historialService: HistorialService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.loadInsureds();
  }

  // Cargar asegurados desde el servicio
  async loadInsureds(): Promise<void> {
    try {
      this.insureds = await this.insuredService.getInsureds();
    } catch (error) {
      console.error('Error al cargar asegurados:', error);
    }
  }

  // Exportar el PDF de un asegurado específico
  async exportPdf(insuredId: number): Promise<void> {
    try {
      const pdfBlob = await this.historialService.exportCompleteAttentionReport(insuredId);
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `reporte_asegurado_${insuredId}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error al exportar PDF:', error);
    }
  }
}
