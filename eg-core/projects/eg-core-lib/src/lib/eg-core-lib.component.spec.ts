import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgCoreLibComponent } from './eg-core-lib.component';

describe('EgCoreLibComponent', () => {
  let component: EgCoreLibComponent;
  let fixture: ComponentFixture<EgCoreLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgCoreLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgCoreLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
