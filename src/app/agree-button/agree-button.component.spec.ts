import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgreeButtonComponent } from './agree-button.component';

describe('AgreeButtonComponent', () => {
  let component: AgreeButtonComponent;
  let fixture: ComponentFixture<AgreeButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgreeButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgreeButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
