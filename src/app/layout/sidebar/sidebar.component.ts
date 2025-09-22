import { Component, Input } from '@angular/core';
import { RouterModule, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLinkActive, MatIconModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isMinimized = false;

  navItems = [
    { icon: 'dashboard', text: 'Dashboard', link: '/dashboard' },
    { icon: 'people', text: 'Client 360', link: '/client-360' },
    { icon: 'settings_ethernet', text: 'PLD Engine', link: '/pld-engine' },
    { icon: 'security', text: 'Risk Hub', link: '/risk-hub' },
    { icon: 'school', text: 'Academy', link: '/pld-academy' },
    { icon: 'admin_panel_settings', text: 'Administración', link: '/admin' },
    { icon: 'upload_file', text: 'Carga de Transacciones', link: '/transactions' }, // <-- AÑADIR
    { icon: 'people', text: 'Clientes', link: '/clients' },
  ];
}