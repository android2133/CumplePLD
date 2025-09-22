import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorityReportTemplateComponent } from './authority-report-template.component';

describe('AuthorityReportTemplateComponent', () => {
  let component: AuthorityReportTemplateComponent;
  let fixture: ComponentFixture<AuthorityReportTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorityReportTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorityReportTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
