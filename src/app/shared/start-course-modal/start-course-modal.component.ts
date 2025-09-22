import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-start-course-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule],
  templateUrl: './start-course-modal.component.html',
  styleUrls: ['./start-course-modal.component.scss']
})
export class StartCourseModalComponent {
  constructor(
    public dialogRef: MatDialogRef<StartCourseModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string }
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}