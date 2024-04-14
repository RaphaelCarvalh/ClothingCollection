import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyManagerCreateComponent } from './company-manager-create.component';

describe('CompanyManagerCreateComponent', () => {
  let component: CompanyManagerCreateComponent;
  let fixture: ComponentFixture<CompanyManagerCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompanyManagerCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyManagerCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
