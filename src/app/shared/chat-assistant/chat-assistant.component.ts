import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
}

@Component({
  selector: 'app-chat-assistant',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, MatInputModule, MatFormFieldModule, FormsModule],
  templateUrl: './chat-assistant.component.html',
  styleUrls: ['./chat-assistant.component.scss']
})
export class ChatAssistantComponent {
  isChatOpen = false;
  newMessage = '';
  messages: Message[] = [
    { text: 'Muéstrame el último reporte de clientes de alto riesgo', sender: 'user' },
    { text: 'Aquí tienes el último reporte de clientes de alto riesgo', sender: 'assistant' }
  ];

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  sendMessage(): void {
    if (this.newMessage.trim()) {
      this.messages.push({ text: this.newMessage, sender: 'user' });
      this.newMessage = '';
      // Simular respuesta del asistente
      setTimeout(() => {
        this.messages.push({ text: 'Estoy procesando tu solicitud...', sender: 'assistant' });
      }, 1000);
    }
  }
}