import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError, retry } from "rxjs";
import { SendMessageInterface } from "./message.interface";

@Injectable({ providedIn: 'root' })
export class MessageService {

    constructor(private http: HttpClient) { }

    baseUrl: string = "http://localhost:3000/messages";

    getAllMessages() {
        return this.http.get(`${this.baseUrl}`).pipe(
            retry(1),
            catchError(err => throwError(() => err))
        );
    }

    getMessageById(id: string) {
        return this.http.get(`${this.baseUrl}/${id}`).pipe(
            retry(1),
            catchError(err => throwError(() => err))
        );
    }

    addMessage(message: any) {
        return this.http.post(`${this.baseUrl}`, message).pipe(
            catchError(err => throwError(() => err))
        );
    }

    editMessage(message: any, messageId: string) {
        return this.http.put(`${this.baseUrl}/${messageId}`, message).pipe(
            catchError(err => throwError(() => err))
        );
    }

    deleteMessage(messageId: string) {
        return this.http.delete(`${this.baseUrl}/${messageId}`).pipe(
            catchError(err => throwError(() => err))
        );
    }

    getMessagesByWorkspaceId(workspaceId: string) {
        return this.http.get(`${this.baseUrl}/workspace/${workspaceId}`).pipe(
            catchError(err => {
                console.error('error fetching messages:', err);
                return throwError(() => err);
            })
        )
    }
}