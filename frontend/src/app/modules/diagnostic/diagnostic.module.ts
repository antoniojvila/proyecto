import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiagnosticComponent } from './components/diagnostic/diagnostic.component';
import { DiagnosticRoutingModule } from './diagnostic-routing.module';
import { MaterialModule } from '../../shared/modules/material/material.module';
import { DiagnosticService } from './services/diagnostic.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DiagnosticComponent
  ],
  imports: [
    CommonModule,
    DiagnosticRoutingModule,
    MaterialModule,
    HttpClientModule,
    RouterModule,
    SharedModule
  ],
  providers: [
    DiagnosticService
  ]
})
export class DiagnosticModule { }
