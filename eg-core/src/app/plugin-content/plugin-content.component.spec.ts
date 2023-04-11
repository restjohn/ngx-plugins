import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { PluginContentComponent } from './plugin-content.component';

describe('PluginContentComponent', () => {
  let component: PluginContentComponent;
  let fixture: ComponentFixture<PluginContentComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PluginContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PluginContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads the given plugin', () => {

  })
});
