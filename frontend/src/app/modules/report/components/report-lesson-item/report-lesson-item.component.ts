import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-report-lesson-item',
  templateUrl: './report-lesson-item.component.html',
  styleUrls: ['./report-lesson-item.component.scss']
})
export class ReportLessonItemComponent implements OnInit {
  @Input() public image: string | null = "";
  @Input() public lessonName: string | null = "";
  @Input() public complete: boolean = false;

  constructor() {}

  ngOnInit(): void {
    console.log(this.image);
  }
}
