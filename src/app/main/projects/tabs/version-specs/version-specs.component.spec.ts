import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VersionSpecsComponent } from './version-specs.component';

describe('VersionSpecsComponent', () => {
  let component: VersionSpecsComponent;
  let fixture: ComponentFixture<VersionSpecsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VersionSpecsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VersionSpecsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
