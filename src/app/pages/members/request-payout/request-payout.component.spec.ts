import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestPayoutComponent } from './request-payout.component';

describe('RequestPayoutComponent', () => {
  let component: RequestPayoutComponent;
  let fixture: ComponentFixture<RequestPayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestPayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestPayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
