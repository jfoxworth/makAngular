import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignSignoffsComponent } from './design-signoffs.component';

describe('DesignSignoffsComponent', () => {
  let component: DesignSignoffsComponent;
  let fixture: ComponentFixture<DesignSignoffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignSignoffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignSignoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
