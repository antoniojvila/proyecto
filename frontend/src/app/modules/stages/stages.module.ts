import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { StagesRoutingModule } from './stages-routing.module';
import { StagesComponent } from './component/stages/stages.component';
import { StageComponent } from './component/stage/stage.component';
import { StagesService } from './component/services/stages.service';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    StagesComponent,
    StageComponent
  ],
  imports: [
    CommonModule,
    StagesRoutingModule,
    RouterModule,
    SharedModule,
    HttpClientModule
  ],
  providers: [
    StagesService
  ]
})
export class StagesModule { }
