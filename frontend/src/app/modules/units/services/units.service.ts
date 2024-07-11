import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface IUnitDTO {
    name: string;
}

export interface IUnit {
    id: number;
    name: string;
    level: number;
    show_for_my_level: boolean;
}

export interface ILesson {
    id: number,
    name: string,
    image: string,
    video: string | null,
    unit: number
}

@Injectable()
export class UnitsService {
    public baseURL: string = "http://localhost:8000";

    constructor(private httpCliente: HttpClient) {}

    public getUnit(id: string): Observable<ILesson[]> {
        return this.httpCliente.get<ILesson[]>(this.baseURL + "/api/my_lesson/?unit=" + id);
    }

    public completeUnits(unit: number): Observable<IUnit[]> {
        return this.httpCliente.patch<IUnit[]>(this.baseURL + "/api/my_lesson/" + unit, {
            "completed": true
        });
    }
}
