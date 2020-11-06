import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageDetails } from './../models/messagedetails.model';
import { Injectable } from '@angular/core';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SaveMessageService {

  constructor(private http: HttpClient) { }

  saveMessage(twit: MessageDetails){
    return this.http.post<MessageDetails>('https://fqzlivja55.execute-api.eu-central-1.amazonaws.com/create_message', twit)
    .subscribe({
      error: error => {
        console.log(error?.message)
      }
    });
  }
}
