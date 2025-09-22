import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ChatAssistantComponent } from '../../shared/chat-assistant/chat-assistant.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterModule, HeaderComponent, SidebarComponent, ChatAssistantComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  isSidebarMinimized = false;

  toggleSidebar() {
    this.isSidebarMinimized = !this.isSidebarMinimized;
  }
}