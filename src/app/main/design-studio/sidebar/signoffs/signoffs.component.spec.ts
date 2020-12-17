import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignoffsComponent } from './signoffs.component';

describe('SignoffsComponent', () => {
  let component: SignoffsComponent;
  let fixture: ComponentFixture<SignoffsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignoffsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignoffsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
