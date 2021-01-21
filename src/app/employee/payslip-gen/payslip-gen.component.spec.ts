import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayslipGenComponent } from './payslip-gen.component';

describe('PayslipGenComponent', () => {
  let component: PayslipGenComponent;
  let fixture: ComponentFixture<PayslipGenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayslipGenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayslipGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
