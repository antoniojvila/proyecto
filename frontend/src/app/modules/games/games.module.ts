import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DragSignComponent } from './components/drag-sign/drag-sign.component';
import { GamesComponent } from './components/games/games.component';
import { GamesRoutingModule } from './games-routing.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DragSignComponent,
    GamesComponent
  ],
  imports: [
    CommonModule,
    GamesRoutingModule,
    SharedModule
  ]
})
export class GamesModule { }
