import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordStreamComponent } from './record-stream.component';

describe('RecordStreamComponent', () => {
  let component: RecordStreamComponent;
  let fixture: ComponentFixture<RecordStreamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordStreamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordStreamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
