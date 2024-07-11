import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UnitsRoutingModule } from './units-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UnitsComponent } from './components/units/units.component';
import { UnitComponent } from './components/unit/unit.component';
import { UnitsService } from './services/units.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UnitsComponent,
    UnitComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    UnitsRoutingModule,
    RouterModule,
    HttpClientModule
  ],
  providers:[
    UnitsService
  ]
})
export class UnitsModule { }
