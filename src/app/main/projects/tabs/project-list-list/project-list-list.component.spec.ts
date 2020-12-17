import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectListListComponent } from './project-list-list.component';

describe('ProjectListListComponent', () => {
  let component: ProjectListListComponent;
  let fixture: ComponentFixture<ProjectListListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectListListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectListListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
