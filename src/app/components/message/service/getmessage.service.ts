import { MessageDetails } from './../models/messagedetails.model';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
const s_msg: string =  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum';
@Injectable({
  providedIn: 'root'
})
export class GetmessageService {
  
  messages = new BehaviorSubject<MessageDetails[]>([]);
  currentMessages = this.messages.asObservable();
  currentSection: Number = 1;

  constructor() { }

  getMessages(section: Number): void {
    if (section > this.currentSection) {
      let temporaryMessages = this.messages.getValue();
      
      // api call to add more messages
      temporaryMessages.concat([]);
      this.messages.next(temporaryMessages);
    } else {
      // api call initial
      this.messages.next([
        new MessageDetails('Rein', new Date(), s_msg),
        new MessageDetails('Nikka', new Date(), s_msg),
        new MessageDetails('Pat', new Date(), s_msg),
      ]);
    }
  }
}
