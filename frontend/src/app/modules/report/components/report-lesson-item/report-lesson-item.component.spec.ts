import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportLessonItemComponent } from './report-lesson-item.component';

describe('ReportLessonItemComponent', () => {
  let component: ReportLessonItemComponent;
  let fixture: ComponentFixture<ReportLessonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReportLessonItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReportLessonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
