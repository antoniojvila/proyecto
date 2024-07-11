import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WIPDialogComponent } from './wip-dialog.component';

describe('WIPDialogComponent', () => {
  let component: WIPDialogComponent;
  let fixture: ComponentFixture<WIPDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WIPDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WIPDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
