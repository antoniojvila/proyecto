import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MoveDialogComponent } from '../move-dialog/move-dialog.component';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LessonService } from '../../services/lesson.service';

interface IUnit {
  id: string;
  lessons: ILesson[];
}

export interface ILesson {
  id: number;
  name: string;
  image: string;
  video: string | null;
  unit: number;
}

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrl: './lesson.component.scss'
})
export class LessonComponent implements OnInit {
  public lessons: ILesson[] = [];
  public lesson!: ILesson;
  public unitId: string | null = "";
  public lessonId: string | null = "";

  constructor(
    private matDialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private readonly lessonService: LessonService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (route) => {
        this.unitId = route.get("unit");
        this.lessonId = route.get("lesson");

        this.lessonService.getLesson(this.unitId as string).subscribe({
          next: (result: ILesson[]) => {
            const lessons: ILesson[] = result;
            this.lesson = lessons.filter((value: ILesson) => (value.id + "") === this.lessonId)[0];
          },
          error: error => console.error(error)
        });
      },
      error: error => console.error(error)
    });
  }

  public openMove(): void {
    this.matDialog.open(MoveDialogComponent, {
      data: {
        url: this.lesson.video
      }
    });
  }

  public back(): void {
    this.router.navigate(['/', 'stage', this.unitId]);
  }
}
