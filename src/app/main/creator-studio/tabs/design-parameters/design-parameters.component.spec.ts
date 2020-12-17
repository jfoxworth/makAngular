import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignParametersComponent } from './design-parameters.component';

describe('DesignParametersComponent', () => {
  let component: DesignParametersComponent;
  let fixture: ComponentFixture<DesignParametersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignParametersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignParametersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
