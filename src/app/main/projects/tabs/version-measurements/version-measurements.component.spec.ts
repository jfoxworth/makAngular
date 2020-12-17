import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionMeasurementsComponent } from './version-measurements.component';

describe('VersionMeasurementsComponent', () => {
  let component: VersionMeasurementsComponent;
  let fixture: ComponentFixture<VersionMeasurementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionMeasurementsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionMeasurementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
