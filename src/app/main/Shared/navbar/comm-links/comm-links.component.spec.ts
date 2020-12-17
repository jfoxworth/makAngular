import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommLinksComponent } from './comm-links.component';

describe('CommLinksComponent', () => {
  let component: CommLinksComponent;
  let fixture: ComponentFixture<CommLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
