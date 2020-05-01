import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatorStudioComponent } from './creator-studio.component';

describe('CreatorStudioComponent', () => {
  let component: CreatorStudioComponent;
  let fixture: ComponentFixture<CreatorStudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatorStudioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatorStudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
