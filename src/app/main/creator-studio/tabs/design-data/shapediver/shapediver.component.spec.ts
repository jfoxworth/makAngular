import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShapediverComponent } from './shapediver.component';

describe('ShapediverComponent', () => {
  let component: ShapediverComponent;
  let fixture: ComponentFixture<ShapediverComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShapediverComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShapediverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
