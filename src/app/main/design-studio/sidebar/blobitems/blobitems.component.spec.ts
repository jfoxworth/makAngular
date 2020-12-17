import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlobitemsComponent } from './blobitems.component';

describe('BlobitemsComponent', () => {
  let component: BlobitemsComponent;
  let fixture: ComponentFixture<BlobitemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlobitemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlobitemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
