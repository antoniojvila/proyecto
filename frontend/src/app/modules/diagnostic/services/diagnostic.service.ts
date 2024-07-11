import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IDiagnostic, IDiagnosticDTO } from "../components/diagnostic/diagnostic.component";

@Injectable()
export class DiagnosticService {
    public baseURL: string = "http://localhost:8000";

    constructor(private httpCliente: HttpClient) {}

    public getDiagnostics(): Observable<IDiagnostic[]> {
        return this.httpCliente.get<IDiagnostic[]>(this.baseURL + "/api/diagnostic/");
    }

    public submitDiagnostic(body: IDiagnosticDTO[]): Observable<void> {
        return this.httpCliente.post<void>(this.baseURL + "/api/submit-response/", body);
    }
}
