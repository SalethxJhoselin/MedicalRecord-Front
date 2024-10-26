import { NgClass, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
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

  menuItems = [
    {
      title: 'Perfil',
      route: '/profile',
      icon: 'home',
      submenus: []
    },
    {
      title: 'Home',
      route: '/#',
      icon: 'home',
      submenus: []
    },
    {
      title: 'Usuarios',
      route: '/tables',
      icon: 'home',
      submenus: [
        { title: 'Tabla 1', route: '/tables/tabla1' },
        { title: 'Tabla 2', route: '/tables/tabla2' }
      ]
    },
    {
      title: 'Atenciones medicas',
      route: '#',
      icon: 'notifications',
      submenus: [
        { title: 'Ver Notificaciones', route: '/notifications/view' },
        { title: 'Configuración', route: '/notifications/settings' }
      ]
    },
    {
      title: 'Auth Pages',
      route: null,
      icon: null,
      submenus: [
        { title: 'Iniciar Sesión', route: '/iniciarSesion' },
        { title: 'Registrarse', route: '/registrarse' }
      ]
    }
  ];

  setSelected(title: string) {
    this.selected = title;
  }
}
