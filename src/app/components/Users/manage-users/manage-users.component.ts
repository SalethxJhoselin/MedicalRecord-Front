import { NgFor } from '@angular/common';
import { Component } from '@angular/core';


interface Role {
  id: number;
  name: string;
}

interface User {
  id: number;
  nombre: string;
  usuario: string;
  email: string;
  direccion: string;
  enabled: boolean;
  role: Role;
}

@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [NgFor],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent{
  users: User[] = [
    {
      id: 1,
      nombre: '123',
      usuario: 'ADMIN',
      email: 'saleth@gmail.com',
      direccion: '',
      enabled: true,
      role: { id: 1, name: 'ADMIN' }
    },
    {
      id: 2,
      nombre: 'Jhon Said Andia',
      usuario: 'Jeanne',
      email: 'jhademels123@gmail.com',
      direccion: '',
      enabled: true,
      role: { id: 2, name: 'USER' }
    },
    {
      id: 3,
      nombre: 'Juan Marcelo Camacho',
      usuario: 'Marcelo',
      email: 'marcelo@gmail.com',
      direccion: '',
      enabled: true,
      role: { id: 2, name: 'USER' }
    }
  ];

  constructor() {}

  ngOnInit(): void {}

  editUser(userId: number) {
    console.log('Editar usuario con ID:', userId);
  }

  deleteUser(userId: number) {
    console.log('Eliminar usuario con ID:', userId);
  }
}
