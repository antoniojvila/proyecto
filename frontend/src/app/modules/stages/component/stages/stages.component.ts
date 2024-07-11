import { Component, OnInit } from '@angular/core';
import { IUnit, StagesService } from '../services/stages.service';

@Component({
  selector: 'app-stages',
  templateUrl: './stages.component.html',
  styleUrl: './stages.component.scss'
})
export class StagesComponent implements OnInit {
  public units: IUnit[] = [];

  constructor(private readonly stagesService: StagesService) {}

  ngOnInit(): void {
    console.log("StagesComponent => localstorage");
    console.log(localStorage.getItem("access"));
    this.stagesService.getUnits().subscribe({
      next: (result: IUnit[]) => this.units = result,
      error: error => console.error(error)
    });
  }
}
