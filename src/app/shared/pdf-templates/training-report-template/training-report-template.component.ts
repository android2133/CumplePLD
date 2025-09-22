import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-training-report-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './training-report-template.component.html',
  styleUrls: ['./training-report-template.component.scss']
})
export class TrainingReportTemplateComponent {
  @Input() staffData: any[] = [];
  currentDate = new Date();
}