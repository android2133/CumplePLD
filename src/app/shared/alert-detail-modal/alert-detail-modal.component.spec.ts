import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertDetailModalComponent } from './alert-detail-modal.component';

describe('AlertDetailModalComponent', () => {
  let component: AlertDetailModalComponent;
  let fixture: ComponentFixture<AlertDetailModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlertDetailModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertDetailModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
