import { Injectable } from "@angular/core";
import { IReport } from "../components/report/report.component";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ReportService {
    public baseURL: string = "http://localhost:8000";

    constructor(private readonly httpClient: HttpClient) {}

    public getReport(): Observable<IReport[]> {
        return this.httpClient.get<IReport[]>(this.baseURL + "/api/users/reports/");
    }
}
