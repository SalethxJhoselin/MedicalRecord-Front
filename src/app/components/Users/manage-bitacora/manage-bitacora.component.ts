import { Component } from '@angular/core';
import { Bitacora, BitacoraService } from '../../../core/services/Users/bitacora.service';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-manage-bitacora',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './manage-bitacora.component.html',
  styleUrl: './manage-bitacora.component.css'
})
export class ManageBitacoraComponent {
  bitacoras: Bitacora[] = [];
  filteredBitacoras: Bitacora[] = [];
  userFilter: string = '';
  dateFilter: Date | null = null;
  onWait: boolean = false;

  constructor(private bitacoraService: BitacoraService) { }

  ngOnInit(): void {
    this.loadDates();
  }

  async loadDates() {
    this.onWait = true;
    try {
      this.bitacoras = await this.bitacoraService.getDates();
      this.applyFilter();
    } catch (error) {
      console.error('Error al cargar los datos', error);
    }
    this.onWait = false;
  }

  applyFilter() {
    this.filteredBitacoras = this.bitacoras.filter(bitacora => {
      const bitacoraDate = new Date(bitacora.fecha).toISOString().split('T')[0]; // Formato YYYY-MM-DD
      const selectedDate = this.dateFilter ? this.dateFilter.toISOString().split('T')[0] : null;

      return bitacora.usuario.toLowerCase().includes(this.userFilter.toLowerCase()) &&
        (!selectedDate || bitacoraDate === selectedDate);
    });
  }

  clearFilters() {
    this.userFilter = '';
    this.dateFilter = null;
    this.applyFilter();
  }


}
