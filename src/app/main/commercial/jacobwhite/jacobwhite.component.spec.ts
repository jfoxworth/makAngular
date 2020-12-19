import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JacobwhiteComponent } from './jacobwhite.component';

describe('JacobwhiteComponent', () => {
  let component: JacobwhiteComponent;
  let fixture: ComponentFixture<JacobwhiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JacobwhiteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JacobwhiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
