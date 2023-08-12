import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachmentDlgComponent } from './attachment-dlg.component';

describe('AttachmentDlgComponent', () => {
  let component: AttachmentDlgComponent;
  let fixture: ComponentFixture<AttachmentDlgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AttachmentDlgComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachmentDlgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
