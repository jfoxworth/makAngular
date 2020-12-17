import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageselectComponent } from './imageselect.component';

describe('ImageselectComponent', () => {
  let component: ImageselectComponent;
  let fixture: ComponentFixture<ImageselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageselectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
