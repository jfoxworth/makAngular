import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignMarketplaceComponent } from './design-marketplace.component';

describe('DesignMarketplaceComponent', () => {
  let component: DesignMarketplaceComponent;
  let fixture: ComponentFixture<DesignMarketplaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignMarketplaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignMarketplaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
