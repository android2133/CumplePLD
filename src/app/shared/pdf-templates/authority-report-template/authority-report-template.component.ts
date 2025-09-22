import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-authority-report-template',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authority-report-template.component.html',
  styleUrls: ['./authority-report-template.component.scss']
})
export class AuthorityReportTemplateComponent {
  @Input() suspiciousTransactions: any[] = [];
  currentDate = new Date();
}