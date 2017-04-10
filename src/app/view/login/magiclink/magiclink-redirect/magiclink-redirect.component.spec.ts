import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MagiclinkRedirectComponent } from './magiclink-redirect.component';

describe('MagiclinkRedirectComponent', () => {
  let component: MagiclinkRedirectComponent;
  let fixture: ComponentFixture<MagiclinkRedirectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagiclinkRedirectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagiclinkRedirectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
