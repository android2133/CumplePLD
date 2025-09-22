import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-professional-report-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './professional-report-template.component.html',
  styleUrls: ['./professional-report-template.component.scss']
})
export class ProfessionalReportTemplateComponent {
  @Input() metrics: any;
  @Input() highRiskClients: any[] = [];
  currentDate = new Date();
}