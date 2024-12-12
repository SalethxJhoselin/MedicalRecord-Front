import { Component, OnInit } from '@angular/core';
import { EstadisticasService } from '../services/estadisticas.service';
import { NgFor, NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartType, ChartOptions, ChartData } from 'chart.js';

@Component({
  selector: 'app-estadisticas',
  standalone: true,
  imports: [NgFor, NgIf, BaseChartDirective],
  templateUrl: './estadisticas.component.html',
  styleUrls: ['./estadisticas.component.css'],
})
export class EstadisticasComponent implements OnInit {
  atencionesPorMes: any[] = [];
  serviciosMasSolicitados: any[] = [];
  atencionesPorEstado: any[] = [];
  atencionesPorMedico: any[] = [];
  onWait: boolean = false;

  // Configuración de gráficos
  chartType: ChartType = 'bar';
  chartOptions: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  chartDataMes: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Atenciones por Mes',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  chartDataServicios: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Servicios Más Solicitados',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  chartDataEstado: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Atenciones por Estado',
        data: [],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  chartDataMedico: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        label: 'Atenciones por Médico',
        data: [],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  constructor(private estadisticasService: EstadisticasService) {}

  ngOnInit(): void {
    this.loadStatistics();
  }

  async loadStatistics() {
    this.onWait = true;
    try {
      // Cargar atenciones por mes
      this.atencionesPorMes = await this.estadisticasService.getAtencionesPorMes();
      this.chartDataMes.labels = this.atencionesPorMes.map((item) => `${item.mes}-${item.mes}`);
      this.chartDataMes.datasets[0].data = this.atencionesPorMes.map((item) => item.total);

      // Cargar servicios más solicitados
      this.serviciosMasSolicitados = await this.estadisticasService.getServiciosMasSolicitados();
      this.chartDataServicios.labels = this.serviciosMasSolicitados.map((item) => item.servicio);
      this.chartDataServicios.datasets[0].data = this.serviciosMasSolicitados.map((item) => item.total);

      // Cargar atenciones por estado
      this.atencionesPorEstado = await this.estadisticasService.getAtencionesPorEstado();
      this.chartDataEstado.labels = this.atencionesPorEstado.map((item) => item.estado);
      this.chartDataEstado.datasets[0].data = this.atencionesPorEstado.map((item) => item.total);

      // Cargar atenciones por médico
      this.atencionesPorMedico = await this.estadisticasService.getAtencionesPorMedico();
      this.chartDataMedico.labels = this.atencionesPorMedico.map((item) => item.medico);
      this.chartDataMedico.datasets[0].data = this.atencionesPorMedico.map((item) => item.total);

      console.log('Estadísticas cargadas con éxito.');
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
    this.onWait = false;
  }
}
