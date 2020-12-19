import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RamadaComponent } from './ramada.component';

describe('RamadaComponent', () => {
  let component: RamadaComponent;
  let fixture: ComponentFixture<RamadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RamadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RamadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
