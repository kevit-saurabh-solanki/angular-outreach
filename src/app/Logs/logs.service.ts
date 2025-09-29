import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { LogsInterface } from "./logs.interface";
import { catchError, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
}) 
export class LogsService {

    constructor(private readonly http: HttpClient) {}

    getLogsByWorkspaceId(workspaceId: string) {
        return this.http.get<LogsInterface[]>(`http://localhost:3000/audit_logs/${workspaceId}`).pipe(
            catchError(err => {
                return throwError(() => err);
            })
        )
    }
}