import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, Subscription } from 'rxjs';
import { DiagnosticService } from '../../services/diagnostic.service';
import { Router } from '@angular/router';

export interface IDiagnosticQuestion {
  id: number;
  name: string;
  image: string | null;
  ico: string | null;
  video: string | null;
  unit: number;
};

export interface IDiagnosticOptions {
  id: number;
  name: string;
};

export interface IDiagnostic {
  question: IDiagnosticQuestion,
  options: IDiagnosticOptions[]
};

export interface IDiagnosticDTO {
  lesson_id: number;
  response: string;
  time_taken: number;
}

const mockup: IDiagnostic[] = [
  {
      "question": {
          "id": 81,
          "name": "O",
          "image": "/media/images/VOCALES/O.png",
          "ico": "/media/images/VOCALES/O.png",
          "video": null,
          "unit": 7
      },
      "options": [
          {
              "id": 78,
              "name": "8"
          },
          {
              "id": 83,
              "name": "A"
          },
          {
              "id": 99,
              "name": "Z"
          },
          {
              "id": 102,
              "name": "J"
          },
          {
              "id": 101,
              "name": "V"
          },
          {
              "id": 81,
              "name": "O"
          }
      ]
  },
  {
      "question": {
          "id": 82,
          "name": "E",
          "image": "/media/images/VOCALES/E.png",
          "ico": "/media/images/VOCALES/E.png",
          "video": null,
          "unit": 7
      },
      "options": [
          {
              "id": 72,
              "name": "5"
          },
          {
              "id": 106,
              "name": "Y"
          },
          {
              "id": 105,
              "name": "O"
          },
          {
              "id": 62,
              "name": "rosado"
          },
          {
              "id": 83,
              "name": "A"
          },
          {
              "id": 82,
              "name": "E"
          }
      ]
  },
  {
      "question": {
          "id": 76,
          "name": "números",
          "image": "/media/images/123/n%C3%BAmeros.png",
          "ico": "/media/images/123/n%C3%BAmeros.png",
          "video": "/media/videos/123/n%C3%BAmeros.mp4",
          "unit": 6
      },
      "options": [
          {
              "id": 93,
              "name": "G"
          },
          {
              "id": 94,
              "name": "P"
          },
          {
              "id": 74,
              "name": "1"
          },
          {
              "id": 96,
              "name": "U"
          },
          {
              "id": 61,
              "name": "colores"
          },
          {
              "id": 76,
              "name": "números"
          }
      ]
  },
  {
      "question": {
          "id": 75,
          "name": "3",
          "image": "/media/images/123/3.png",
          "ico": "/media/images/123/3.png",
          "video": null,
          "unit": 6
      },
      "options": [
          {
              "id": 89,
              "name": "W"
          },
          {
              "id": 90,
              "name": "Ñ"
          },
          {
              "id": 75,
              "name": "3"
          },
          {
              "id": 95,
              "name": "M"
          },
          {
              "id": 86,
              "name": "B"
          },
          {
              "id": 63,
              "name": "amarillo"
          }
      ]
  },
  {
      "question": {
          "id": 57,
          "name": "azul",
          "image": "/media/images/COLORES/azul.png",
          "ico": null,
          "video": "/media/videos/COLORES/azul.mp4",
          "unit": 5
      },
      "options": [
          {
              "id": 57,
              "name": "azul"
          },
          {
              "id": 96,
              "name": "U"
          },
          {
              "id": 76,
              "name": "números"
          },
          {
              "id": 80,
              "name": "I"
          },
          {
              "id": 97,
              "name": "D"
          },
          {
              "id": 77,
              "name": "10"
          }
      ]
  },
  {
      "question": {
          "id": 59,
          "name": "verde",
          "image": "/media/images/COLORES/verde.png",
          "ico": "/media/images/COLORES/verde.png",
          "video": "/media/videos/COLORES/verde.mp4",
          "unit": 5
      },
      "options": [
          {
              "id": 108,
              "name": "K"
          },
          {
              "id": 76,
              "name": "números"
          },
          {
              "id": 111,
              "name": "Q"
          },
          {
              "id": 57,
              "name": "azul"
          },
          {
              "id": 61,
              "name": "colores"
          },
          {
              "id": 59,
              "name": "verde"
          }
      ]
  },
  {
      "question": {
          "id": 112,
          "name": "L",
          "image": "/media/images/ABC/L.png",
          "ico": "/media/images/ABC/L.png",
          "video": null,
          "unit": 8
      },
      "options": [
          {
              "id": 91,
              "name": "R"
          },
          {
              "id": 58,
              "name": "morado"
          },
          {
              "id": 107,
              "name": "E"
          },
          {
              "id": 112,
              "name": "L"
          },
          {
              "id": 60,
              "name": "marrón"
          },
          {
              "id": 64,
              "name": "naranja"
          }
      ]
  },
  {
      "question": {
          "id": 94,
          "name": "P",
          "image": "/media/images/ABC/P.png",
          "ico": "/media/images/ABC/P.png",
          "video": null,
          "unit": 8
      },
      "options": [
          {
              "id": 89,
              "name": "W"
          },
          {
              "id": 80,
              "name": "I"
          },
          {
              "id": 59,
              "name": "verde"
          },
          {
              "id": 70,
              "name": "7"
          },
          {
              "id": 94,
              "name": "P"
          },
          {
              "id": 83,
              "name": "A"
          }
      ]
  }
];

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {
  public diagnostics: IDiagnostic[] = [];
  public diagnosticResponse: IDiagnosticDTO[] = [];
  public timerSubscription: Subscription = new Subscription();
  public time: number = 0;

  constructor(
    private readonly diagnosticService: DiagnosticService,
    private readonly router: Router,
    private readonly matSnackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.diagnosticService.getDiagnostics().subscribe({
      next: (result: IDiagnostic[]) => {
        this.diagnostics = result;
        this.startTime();
      },
      error: error => console.error(error)
    });
  }

  public startTime(): void {
    this.time = 0;
    this.timerSubscription.unsubscribe();

    this.timerSubscription = interval(1000).subscribe({
      next: () => this.time = this.time + 1,
      error: error => console.error(error)
    });
  }

  public disableOptions(nodes: NodeListOf<ChildNode>): void {
    for(let i = 0 ; i < nodes.length ; i++) {
      (nodes[i] as HTMLButtonElement).disabled = true;
    }
  }

  public selectOption(diagnostic: IDiagnostic, option: IDiagnosticOptions, options: HTMLDivElement): void {
    const nodes = options.childNodes;

    this.disableOptions(nodes);

    this.diagnosticResponse = [
      ...this.diagnosticResponse,
      {
        lesson_id: diagnostic.question.id,
        response: option.name,
        time_taken: this.time
      }
    ];

    this.startTime();
  }

  public submit(): void {
    if(this.diagnostics.length === this.diagnosticResponse.length) {
      this.time = 0;
      this.timerSubscription.unsubscribe();

      this.diagnosticService.submitDiagnostic(this.diagnosticResponse).subscribe({
        next: () => {
          this.router.navigate(["/", "stages"]);
        },
        error: error => console.error(error)
      });
    } else {
      this.matSnackBar.open("Debe completar todas las pruebas", "", {
        duration: 3000,
        verticalPosition: "top"
      });
    }
  }
}
