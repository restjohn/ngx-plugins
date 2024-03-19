import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EgPlugin1LibComponent } from './eg-plugin1-lib.component';

describe('EgPlugin1LibComponent', () => {
  let component: EgPlugin1LibComponent;
  let fixture: ComponentFixture<EgPlugin1LibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EgPlugin1LibComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EgPlugin1LibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
