import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsetupComponent } from './eventsetup.component';

describe('EventsetupComponent', () => {
  let component: EventsetupComponent;
  let fixture: ComponentFixture<EventsetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventsetupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
