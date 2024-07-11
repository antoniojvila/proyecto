import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ILesson {
    id: number;
    name: string;
    image: string;
    video: string | null;
    unit: number;
}

@Injectable()
export class LessonService {
    public baseURL: string = "http://localhost:8000";

    constructor(private httpCliente: HttpClient) {}

    public getLesson(id: string): Observable<ILesson[]> {
        return this.httpCliente.get<ILesson[]>(this.baseURL + "/api/my_lesson/?unit=" + id);
    }
}
