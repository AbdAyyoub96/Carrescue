import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendOfferdialogComponent } from './send-offerdialog.component';

describe('SendOfferdialogComponent', () => {
  let component: SendOfferdialogComponent;
  let fixture: ComponentFixture<SendOfferdialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendOfferdialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendOfferdialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
