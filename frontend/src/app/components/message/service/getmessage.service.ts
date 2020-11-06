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

  getMessages(): void {
    this._http.get<MessageDTO>('https://fqzlivja55.execute-api.eu-central-1.amazonaws.com/get_message', { params: new HttpParams().set("lastEvaluatedKey", this.lastEvaluatedKey) })
      .subscribe(
        data => this.handleResponse(data),
        //() => this.route.navigate(['error']),
        () => this.handleResponse(new MessageDTO(null, [
             new MessageDetails('Rein', new Date(Date.now() + (3600*1000*24)), s_msg),
             new MessageDetails('Nikka', new Date(), s_msg),
             new MessageDetails('Pat', new Date(Date.now() + (3600*1000*24*3)), s_msg),
           ])),
      );


  }
  
  handleResponse(data: MessageDTO) {
    console.log(data)
    this.lastEvaluatedKey = data.lastEvaluatedKey;
    if (this.lastEvaluatedKey) {
      let temporaryMessages = this.messages.getValue();
      
      // let additionalMessages = [
      //   new MessageDetails('Rein2', new Date(Date.now() - (3600*1000*24)), s_msg)
      // ];
      this.messages.next(temporaryMessages.concat(data.messages));
    } else {
      this.messages.next(data.messages);
      // this.messages.next([
      //   new MessageDetails('Rein', new Date(Date.now() + (3600*1000*24)), s_msg),
      //   new MessageDetails('Nikka', new Date(), s_msg),
      //   new MessageDetails('Pat', new Date(Date.now() + (3600*1000*24*3)), s_msg),
      // ]);
    }
  }
}
