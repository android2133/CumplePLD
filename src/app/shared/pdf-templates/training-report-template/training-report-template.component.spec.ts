import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingReportTemplateComponent } from './training-report-template.component';

describe('TrainingReportTemplateComponent', () => {
  let component: TrainingReportTemplateComponent;
  let fixture: ComponentFixture<TrainingReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrainingReportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TrainingReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
