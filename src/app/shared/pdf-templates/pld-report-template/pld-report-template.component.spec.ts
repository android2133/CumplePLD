import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PldReportTemplateComponent } from './pld-report-template.component';

describe('PldReportTemplateComponent', () => {
  let component: PldReportTemplateComponent;
  let fixture: ComponentFixture<PldReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PldReportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PldReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
