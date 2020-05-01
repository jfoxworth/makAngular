import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmenuDialogComponent } from './submenu-dialog.component';

describe('SubmenuDialogComponent', () => {
  let component: SubmenuDialogComponent;
  let fixture: ComponentFixture<SubmenuDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmenuDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmenuDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
