import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHelpCreateComponent } from './get-help-create.component';

describe('GetHelpCreateComponent', () => {
  let component: GetHelpCreateComponent;
  let fixture: ComponentFixture<GetHelpCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHelpCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetHelpCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
