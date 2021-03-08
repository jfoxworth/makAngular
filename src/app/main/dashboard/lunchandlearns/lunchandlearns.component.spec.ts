import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchandlearnsComponent } from './lunchandlearns.component';

describe('LunchandlearnsComponent', () => {
  let component: LunchandlearnsComponent;
  let fixture: ComponentFixture<LunchandlearnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LunchandlearnsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchandlearnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
