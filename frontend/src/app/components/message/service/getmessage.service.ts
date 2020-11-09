import { MessageDTO } from './../models/messagedto.model';
import { Router } from '@angular/router';
import { MessageDetails } from './../models/messagedetails.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
const s_msg: string =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
@Injectable({
  providedIn: 'root'
})
export class GetmessageService {
  
  messages = new BehaviorSubject<MessageDetails[]>([]);
  currentMessages = this.messages.asObservable();
  lastEvaluatedKey: any = null;

  constructor(private _http: HttpClient, private route: Router) { }

  getMessages(hasLEK: boolean = false): void {
    if (hasLEK) this.lastEvaluatedKey = null
    this._http.get<MessageDTO>('https://e5fgcbx4m9.execute-api.eu-central-1.amazonaws.com/get_message', { params: new HttpParams().set("message_id", this.lastEvaluatedKey?.message_id).append("date", this.lastEvaluatedKey?.date) })
      .subscribe(
        data => this.handleResponse(data),
        () => this.route.navigate(['error']),
      );

  }
  
  handleResponse(data: MessageDTO) {
    if (this.lastEvaluatedKey) {
      let temporaryMessages = this.messages.getValue();
    
      this.lastEvaluatedKey = data.lastEvaluatedKey;
      this.messages.next(temporaryMessages.concat(data.messages));
    } else {
      this.lastEvaluatedKey = data.lastEvaluatedKey;
      this.messages.next(data.messages);
    }
  }
}
