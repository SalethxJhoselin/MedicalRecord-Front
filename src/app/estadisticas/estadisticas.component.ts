import { Component,OnInit } from '@angular/core';
import { EstadisticasService } from '../services/estadisticas.service';
import { NgFor, NgIf } from '@angular/common';
//import { NgChartsModule } from 'ng2-charts';


@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './estadisticas.component.html',
  styleUrl: './estadisticas.component.css'
})
export class EstadisticasComponent implements OnInit {
  atencionesPorMes: any[] = [];
  atencionesPorMedico: any[] = [];
  serviciosMasSolicitados: any[] = [];
  atencionesPorEstado: any[] = [];
  onWait: boolean = false;

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  async loadStatistics() {
    this.onWait = true;
    try {
      this.atencionesPorMes = await this.estadisticasService.getAtencionesPorMes();
      this.atencionesPorMedico = await this.estadisticasService.getAtencionesPorMedico();
      this.serviciosMasSolicitados = await this.estadisticasService.getServiciosMasSolicitados();
      this.atencionesPorEstado = await this.estadisticasService.getAtencionesPorEstado();
      console.log('Datos cargados:', {
        atencionesPorMes: this.atencionesPorMes,
        atencionesPorMedico: this.atencionesPorMedico,
        serviciosMasSolicitados: this.serviciosMasSolicitados,
        atencionesPorEstado: this.atencionesPorEstado
      });
    } catch (error) {
      console.error('Error al cargar las estadísticas:', error);
    }
    this.onWait = false;
  }

}
