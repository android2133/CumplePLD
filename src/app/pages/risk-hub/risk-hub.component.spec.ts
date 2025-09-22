import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiskHubComponent } from './risk-hub.component';

describe('RiskHubComponent', () => {
  let component: RiskHubComponent;
  let fixture: ComponentFixture<RiskHubComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiskHubComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RiskHubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
