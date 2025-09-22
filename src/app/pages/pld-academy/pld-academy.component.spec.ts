import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PldAcademyComponent } from './pld-academy.component';

describe('PldAcademyComponent', () => {
  let component: PldAcademyComponent;
  let fixture: ComponentFixture<PldAcademyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PldAcademyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PldAcademyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
