import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { User, UserService } from '../../../core/services/users.service';


@Component({
  selector: 'app-manage-users',
  standalone: true,
  imports: [NgFor],
  templateUrl: './manage-users.component.html',
  styleUrl: './manage-users.component.css'
})
export class ManageUsersComponent{
  users: User[] = [
  ];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        console.log(this.users)
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  editUser(userId: number) {
    console.log('Editar usuario con ID:', userId);
  }

  deleteUser(userId: number) {
    console.log('Eliminar usuario con ID:', userId);
  }
}
