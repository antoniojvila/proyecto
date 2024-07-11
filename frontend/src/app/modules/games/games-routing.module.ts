import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DragSignComponent } from './components/drag-sign/drag-sign.component';

const routes: Routes = [
  {
    path: ":unit",
    component: DragSignComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }
