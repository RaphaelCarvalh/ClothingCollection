import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetHelpListComponent } from './get-help-list.component';

describe('GetHelpListComponent', () => {
  let component: GetHelpListComponent;
  let fixture: ComponentFixture<GetHelpListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHelpListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetHelpListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
