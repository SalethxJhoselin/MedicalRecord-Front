import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, NgClass, NgFor, NgIf],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  selected: string = '';
  @Input() isOpen = false;
  @Output() closeSidebar = new EventEmitter<void>();

  close() {
    this.closeSidebar.emit();
  }

  menuItems = [
    {
      title: 'Home',
      route: '/',
      icon: 'home',
      submenus: []
    },
    {
      title: 'Usuarios',
      route: '/*',
      icon: 'home',
      submenus: [
        { title: 'Perfil de usuario', route: '/perfil' },
        { title: 'Registrar Usuarios', route: '/registrar' },
        { title: 'Gestionar Roles', route: '/roles' },
        { title: 'Asignar Permisos', route: '/permisos' },
        { title: 'Administracion de Usuarios', route: '/usuarios' },
        { title: 'Estionar Reportes', route: '/users' },
        { title: 'Administrar bitacora', route: '/bitacora' },
      ]
    },
    {
      title: 'Gestion Clinica',
      route: '/*',
      icon: 'notifications',
      submenus: [
        { title: 'Gestionar especialidades medicas', route: '/especialidades' },
        { title: 'Gestionar medicos', route: '/medicos' },
        { title: 'Tegistro de triaje', route: '/triaje' },
        { title: 'Gestionar asegurados', route: '/asegurados' },
        { title: 'Gestionar horarios de atencion a medicos', route: '/horariosMedicos' },
        { title: 'EMERGENCIA MEDICA', route: '/emergencia' },
        { title: 'Administrar historiales', route: '/historial' }
      ]
    },
    {
      title: 'Atenciones Medicas',
      route: '/*',
      icon: 'notifications',
      submenus: [
        { title: 'Gestionar Servicio', route: '/servicios' },
        { title: 'Gestionar obtencion de ficha de actencion', route: '/fichaAtencion' },
        { title: 'Gestionar de atencion de consulta', route: '/atenciones' },
        { title: 'Administrar historias clinicas', route: '/registrarse' },
        { title: 'Gestionar tratamiento', route: '/registrarse' }
      ]
    }
  ];

  setSelected(title: string) {
    this.selected = title;
    this.closeSidebar.emit();
  }
}
