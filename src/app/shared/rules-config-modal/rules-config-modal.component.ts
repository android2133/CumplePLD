import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-rules-config-modal',
  standalone: true,
  imports: [
    CommonModule, MatDialogModule, MatButtonModule, MatIconModule,
    MatFormFieldModule, MatInputModule, MatListModule, ReactiveFormsModule
  ],
  templateUrl: './rules-config-modal.component.html',
  styleUrls: ['./rules-config-modal.component.scss']
})
export class RulesConfigModalComponent {
  rules: string[];
  newRuleForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<RulesConfigModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { rules: string[] },
    private fb: FormBuilder
  ) {
    this.rules = [...data.rules]; // Copia las reglas para no modificar el original
    this.newRuleForm = this.fb.group({
      ruleText: ['', Validators.required]
    });
  }

  addRule(): void {
    if (this.newRuleForm.valid) {
      this.rules.push(this.newRuleForm.value.ruleText);
      this.newRuleForm.reset();
    }
  }

  deleteRule(index: number): void {
    this.rules.splice(index, 1);
  }

  save(): void {
    this.dialogRef.close(this.rules);
  }

  close(): void {
    this.dialogRef.close();
  }
}