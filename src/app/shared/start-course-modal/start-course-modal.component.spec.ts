import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartCourseModalComponent } from './start-course-modal.component';

describe('StartCourseModalComponent', () => {
  let component: StartCourseModalComponent;
  let fixture: ComponentFixture<StartCourseModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StartCourseModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StartCourseModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
