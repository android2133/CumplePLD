import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixConfigModalComponent } from './matrix-config-modal.component';

describe('MatrixConfigModalComponent', () => {
  let component: MatrixConfigModalComponent;
  let fixture: ComponentFixture<MatrixConfigModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrixConfigModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatrixConfigModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
