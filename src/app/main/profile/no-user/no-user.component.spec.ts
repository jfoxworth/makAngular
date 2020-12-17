import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NoUserComponent } from './no-user.component';

describe('NoUserComponent', () => {
  let component: NoUserComponent;
  let fixture: ComponentFixture<NoUserComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ NoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
