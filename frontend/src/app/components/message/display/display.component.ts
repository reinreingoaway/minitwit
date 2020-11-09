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
  isDisabled: boolean;

  constructor(public getMsgService: GetmessageService) {
    this.getMsgService.currentMessages
      .pipe(map(messages => messages.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime())))
      .subscribe((messages) => {
        this.isDisabled = this.messages && !this.getMsgService.lastEvaluatedKey
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
