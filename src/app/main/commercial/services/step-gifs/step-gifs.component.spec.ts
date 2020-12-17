import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepGifsComponent } from './step-gifs.component';

describe('StepGifsComponent', () => {
  let component: StepGifsComponent;
  let fixture: ComponentFixture<StepGifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StepGifsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepGifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
