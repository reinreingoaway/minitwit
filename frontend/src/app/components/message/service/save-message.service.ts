import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageDetails } from './../models/messagedetails.model';
import { Injectable } from '@angular/core';
import { GetmessageService } from './getmessage.service';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class SaveMessageService {

  constructor(private http: HttpClient, private getSvc: GetmessageService) { }

  saveMessage(twit: MessageDetails){
     this.http.post<MessageDetails>('https://e5fgcbx4m9.execute-api.eu-central-1.amazonaws.com/create_message', twit)
    .subscribe(
      () => this.getSvc.getMessages(true),
      () => this.getSvc.getMessages(true)
    );
  }
}
