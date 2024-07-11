import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestUserDialogComponent } from './guest-user-dialog.component';

describe('GuestUserDialogComponent', () => {
  let component: GuestUserDialogComponent;
  let fixture: ComponentFixture<GuestUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuestUserDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuestUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
