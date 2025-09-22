import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PldEngineComponent } from './pld-engine.component';

describe('PldEngineComponent', () => {
  let component: PldEngineComponent;
  let fixture: ComponentFixture<PldEngineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PldEngineComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PldEngineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
