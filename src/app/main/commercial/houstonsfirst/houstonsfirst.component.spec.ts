import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HoustonsfirstComponent } from './houstonsfirst.component';

describe('HoustonsfirstComponent', () => {
  let component: HoustonsfirstComponent;
  let fixture: ComponentFixture<HoustonsfirstComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HoustonsfirstComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HoustonsfirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
