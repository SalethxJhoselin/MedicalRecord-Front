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
      route: '/tables',
      icon: 'home',
      submenus: [
        { title: 'Perfil de usuario', route: '/perfil' },
        { title: 'Registrar Usuarios', route: '/registrar' },
        { title: 'Gestionar Roles', route: '/roles' },
        { title: 'Asignar Permisos', route: '/permisos' },
        { title: 'Administracion de Usuarios', route: '/usuarios' },
        { title: 'Estionar Reportes', route: '/users' },
        { title: 'Administrar bitacora', route: '/users' },
      ]
    },
    {
      title: 'Gestion Clinica',
      route: '/table',
      icon: 'notifications',
      submenus: [
        { title: 'Gestionar especialidades medicas', route: '/especialidades' },
        { title: 'Gestionar medicos', route: '/medicos' },
        { title: 'Tegistro de triaje', route: '/notifications/view' },
        { title: 'Gestionar asegurados', route: '/notifications/view' },
        { title: 'Gestionar horarios de atencion a medicos', route: '/notifications/settings' }
      ]
    },
    {
      title: 'Atenciones Medicas',
      route: null,
      icon: null,
      submenus: [
        { title: 'Gestionar Servicio', route: '/iniciarSesion' },
        { title: 'Gestionar obtencion de ficha de actencion', route: '/registrarse' },
        { title: 'Gestionar de atencion de consulta', route: '/registrarse' },
        { title: 'Administrar historias clinicas', route: '/registrarse' },
        { title: 'Gestionar tratamiento', route: '/registrarse' }
      ]
    }
  ];

  setSelected(title: string) {
    this.selected = title;
  }
}
