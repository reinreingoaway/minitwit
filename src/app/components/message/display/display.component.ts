import { GetmessageService } from './../service/getmessage.service';
import { MessageDetails } from './../models/messagedetails.model';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {

  messages: MessageDetails[];
  a: Observable<MessageDetails>;

  constructor(public getMsgService: GetmessageService) {
    this.getMsgService.currentMessages
      .subscribe((messages) => {
        this.messages = messages;
        this.messages.forEach(msg => {
          console.log(msg);
        });
      });
  }

  ngOnInit(): void {
    this.getMsgService.getMessages(1);
  }

}
