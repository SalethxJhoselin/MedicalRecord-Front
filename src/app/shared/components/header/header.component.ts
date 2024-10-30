import { Component, EventEmitter, HostListener, Output } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [SidebarComponent, NgIf],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent {
    isSidebarOpen = false;
    isMobile: boolean | undefined;


    constructor(private authService: AuthService) { }

    ngOnInit() {
        this.checkScreenSize();
    }

    @HostListener('window:resize', ['$event'])
    onResize() {
        this.checkScreenSize();
    }

    private checkScreenSize() {
        this.isMobile = window.innerWidth < 768;
    }

    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }




    logout(): void {
        this.authService.logout();
    }
}