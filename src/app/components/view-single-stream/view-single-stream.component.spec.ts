import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSingleStreamComponent } from './view-single-stream.component';

describe('ViewSingleStreamComponent', () => {
  let component: ViewSingleStreamComponent;
  let fixture: ComponentFixture<ViewSingleStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSingleStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSingleStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
