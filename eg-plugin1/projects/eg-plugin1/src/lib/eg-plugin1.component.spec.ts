import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EgPlugin1Component } from './eg-plugin1.component';

describe('EgPlugin1Component', () => {
  let component: EgPlugin1Component;
  let fixture: ComponentFixture<EgPlugin1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EgPlugin1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EgPlugin1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
