import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBlockComponent } from './page-block.component';

describe('PageBlockComponent', () => {
  let component: PageBlockComponent;
  let fixture: ComponentFixture<PageBlockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PageBlockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
