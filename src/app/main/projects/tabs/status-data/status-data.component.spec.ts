import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusDataComponent } from './status-data.component';

describe('StatusDataComponent', () => {
  let component: StatusDataComponent;
  let fixture: ComponentFixture<StatusDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
