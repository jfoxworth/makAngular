import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MakButtonsComponent } from './mak-buttons.component';

describe('MakButtonsComponent', () => {
  let component: MakButtonsComponent;
  let fixture: ComponentFixture<MakButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MakButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MakButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
