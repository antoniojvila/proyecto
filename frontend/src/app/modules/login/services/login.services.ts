import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

export interface ILoginStudentDTO {
    username: string;
    password: string;
}

@Injectable()
export class LoginService {
    public baseURL: string = "http://localhost:8000";

    constructor(private httpCliente: HttpClient) {}

    public loginStudent(body: ILoginStudentDTO): Observable<{ refresh: string, access: string, diagnostic_completed: string, role: string }> {
        return this.httpCliente.post<{ refresh: string, access: string, diagnostic_completed: string, role: string }>(this.baseURL + "/api/token/", body);
    }
}
