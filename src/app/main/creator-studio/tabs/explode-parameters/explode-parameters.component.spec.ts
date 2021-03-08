import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExplodeParametersComponent } from './explode-parameters.component';

describe('ExplodeParametersComponent', () => {
  let component: ExplodeParametersComponent;
  let fixture: ComponentFixture<ExplodeParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExplodeParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExplodeParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
