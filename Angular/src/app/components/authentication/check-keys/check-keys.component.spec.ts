import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckKeysComponent } from './check-keys.component';

describe('CheckKeysComponent', () => {
  let component: CheckKeysComponent;
  let fixture: ComponentFixture<CheckKeysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckKeysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckKeysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
