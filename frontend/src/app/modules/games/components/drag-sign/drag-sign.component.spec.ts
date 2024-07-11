import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DragSignComponent } from './drag-sign.component';

describe('DragSignComponent', () => {
  let component: DragSignComponent;
  let fixture: ComponentFixture<DragSignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DragSignComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DragSignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
