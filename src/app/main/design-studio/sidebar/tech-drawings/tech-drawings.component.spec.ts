import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechDrawingsComponent } from './tech-drawings.component';

describe('TechDrawingsComponent', () => {
  let component: TechDrawingsComponent;
  let fixture: ComponentFixture<TechDrawingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechDrawingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechDrawingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
