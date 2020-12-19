import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopimageComponent } from './topimage.component';

describe('TopimageComponent', () => {
  let component: TopimageComponent;
  let fixture: ComponentFixture<TopimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopimageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
