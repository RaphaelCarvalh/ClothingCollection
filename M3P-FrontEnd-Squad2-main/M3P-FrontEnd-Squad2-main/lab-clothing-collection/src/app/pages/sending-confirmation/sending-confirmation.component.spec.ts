import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendingConfirmationComponent } from './sending-confirmation.component';

describe('SendingConfirmationComponent', () => {
  let component: SendingConfirmationComponent;
  let fixture: ComponentFixture<SendingConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SendingConfirmationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendingConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
