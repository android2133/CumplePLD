import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessionalReportTemplateComponent } from './professional-report-template.component';

describe('ProfessionalReportTemplateComponent', () => {
  let component: ProfessionalReportTemplateComponent;
  let fixture: ComponentFixture<ProfessionalReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfessionalReportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfessionalReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
