import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedRowComponent } from './related-row.component';

describe('RelatedRowComponent', () => {
  let component: RelatedRowComponent;
  let fixture: ComponentFixture<RelatedRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RelatedRowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
