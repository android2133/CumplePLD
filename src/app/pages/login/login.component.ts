import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatCardModule, MatIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  
  constructor(private el: ElementRef, private renderer: Renderer2, private router: Router) {}

  // Usamos HostListener para detectar el movimiento del mouse en toda la página
  @HostListener('document:mousemove', ['$event'])
  
  onMouseMove(event: MouseEvent) {
    // Calculamos la posición del mouse (del -0.5 a 0.5) para centrar el efecto
    const x = (event.clientX / window.innerWidth) - 0.5;
    const y = (event.clientY / window.innerHeight) - 0.5;

    // Actualizamos las variables CSS en tiempo real
    // El 'nativeElement' es nuestro componente <app-login>
    const hostElement = this.el.nativeElement;
    this.renderer.setStyle(hostElement, '--mouse-x', x);
    this.renderer.setStyle(hostElement, '--mouse-y', y);
  }

  login() {
    // Lógica de autenticación simulada
    this.router.navigate(['/dashboard']);
  }
}