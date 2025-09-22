import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Client360Component } from './client-360.component';

describe('Client360Component', () => {
  let component: Client360Component;
  let fixture: ComponentFixture<Client360Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Client360Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Client360Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
