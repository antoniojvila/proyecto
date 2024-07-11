import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfigurationRoutingModule } from './configuration-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ConfigurationComponent } from './components/configuration/configuration.component';

@NgModule({
  declarations: [
    ConfigurationComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ConfigurationRoutingModule
  ]
})
export class ConfigurationModule { }
