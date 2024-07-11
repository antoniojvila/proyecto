import { Component, Input } from '@angular/core';
import { UnitsService } from '../../services/units.service';

@Component({
  selector: 'app-unit',
  templateUrl: './unit.component.html',
  styleUrl: './unit.component.scss'
})
export class UnitComponent {
  @Input("title") public title: string = "";
  @Input("unit") public unit: string = "";
  @Input("lesson") public lesson: number = 0;

  constructor(private readonly unitsService: UnitsService) {}

  public completeLeson(): void {
    this.unitsService.completeUnits(this.lesson);
  }
}
