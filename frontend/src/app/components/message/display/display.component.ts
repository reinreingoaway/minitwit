import { GetmessageService } from './../service/getmessage.service';
import { MessageDetails } from './../models/messagedetails.model';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  messages: MessageDetails[];

  constructor(public getMsgService: GetmessageService) {
    this.getMsgService.currentMessages
      .pipe(map(messages => messages.sort((a,b) => b.date.getTime() - a.date.getTime())))
      .subscribe((messages) => {
        this.messages = messages;
      });
  }

  ngOnInit(): void {
    this.getMsgService.getMessages();
  }

  loadMoreMessage(): void {
    this.getMsgService.getMessages();
  }

}
