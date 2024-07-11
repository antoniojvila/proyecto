import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LessonRoutingModule } from './lesson-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { LessonComponent } from './components/lesson/lesson.component';
import { LessonService } from './services/lesson.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    LessonComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    LessonRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers: [
    LessonService
  ]
})
export class LessonModule { }
