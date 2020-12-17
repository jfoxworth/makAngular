import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorselectComponent } from './colorselect.component';

describe('ColorselectComponent', () => {
  let component: ColorselectComponent;
  let fixture: ComponentFixture<ColorselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColorselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
