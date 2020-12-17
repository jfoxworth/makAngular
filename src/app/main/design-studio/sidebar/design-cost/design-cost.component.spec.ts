import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignCostComponent } from './design-cost.component';

describe('DesignCostComponent', () => {
  let component: DesignCostComponent;
  let fixture: ComponentFixture<DesignCostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignCostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
