import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHelpEditComponent } from './get-help-edit.component';

describe('GetHelpEditComponent', () => {
  let component: GetHelpEditComponent;
  let fixture: ComponentFixture<GetHelpEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHelpEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetHelpEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
