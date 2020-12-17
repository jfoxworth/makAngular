import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignPriceComponent } from './design-price.component';

describe('DesignPriceComponent', () => {
  let component: DesignPriceComponent;
  let fixture: ComponentFixture<DesignPriceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignPriceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignPriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
