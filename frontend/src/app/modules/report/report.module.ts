import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReportComponent } from './components/report/report.component';
import { ReportLessonItemComponent } from './components/report-lesson-item/report-lesson-item.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ReportService } from './services/report.service';

@NgModule({
  declarations: [
    ReportComponent,
    ReportLessonItemComponent
  ],
  imports: [
    CommonModule,
    ReportRoutingModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    ReportService
  ]
})
export class ReportModule { }
