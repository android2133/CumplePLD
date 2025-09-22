import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesConfigModalComponent } from './rules-config-modal.component';

describe('RulesConfigModalComponent', () => {
  let component: RulesConfigModalComponent;
  let fixture: ComponentFixture<RulesConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RulesConfigModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RulesConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
