import { Component, OnInit, ViewChild, ElementRef, AfterViewChecked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ChatAgentService, ChatPayload } from '../../services/chat-agent.service';

interface Message {
  text: string;
  sender: 'user' | 'assistant';
}

interface HistoryPart {
  parts: { text: string }[];
  role: 'user' | 'model';
}

@Component({
  selector: 'app-chat-assistant',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatTooltipModule
  ],
  templateUrl: './chat-assistant.component.html',
  styleUrls: ['./chat-assistant.component.scss']
})
export class ChatAssistantComponent implements OnInit, AfterViewChecked {
  @ViewChild('chatMessagesContainer') private chatContainer!: ElementRef;

  isChatOpen = false;
  isLoading = false;
  newMessage = '';
  messages: Message[] = [];
  chatHistory: HistoryPart[] = [];
  
  chatWindowHeight = 350; // Altura inicial

  constructor(private chatAgentService: ChatAgentService) {}

  ngOnInit(): void {
    this.startNewChat();
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      if (this.chatContainer?.nativeElement) {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      }
    } catch (err) {
      console.error("Error al hacer scroll:", err);
    }
  }

  toggleChat(): void {
    this.isChatOpen = !this.isChatOpen;
  }

  startNewChat(): void {
    this.messages = [{ text: 'Hola, soy el asistente de CumplePLD. ¿En qué puedo ayudarte hoy?', sender: 'assistant' }];
    this.chatHistory = [];
    this.chatWindowHeight = 350;
  }

  sendMessage(): void {
    const userMessage = this.newMessage.trim();
    if (!userMessage || this.isLoading) return;

    this.addMessage({ text: userMessage, sender: 'user' });
    this.newMessage = '';
    this.isLoading = true;

    const payload: ChatPayload = {
      texto: userMessage,
      coleccion: "CUMPLE_PLD",
      historia: JSON.stringify(this.chatHistory),
      instruccionesSistema: "",
      contenidos: []
    };

    this.chatAgentService.sendMessage(payload).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.addMessage({ text: response.respuesta, sender: 'assistant' });
        this.chatHistory = JSON.parse(response.historia);
      },
      error: (err) => {
        this.isLoading = false;
        console.error("Error en el servicio de chat:", err);
        this.addMessage({ text: 'Lo siento, hubo un error al procesar tu solicitud.', sender: 'assistant' });
      }
    });
  }
  
  addMessage(message: Message): void {
    this.messages.push(message);
    
    if (this.chatWindowHeight < 550) {
      this.chatWindowHeight += 20;
    }
  }
}