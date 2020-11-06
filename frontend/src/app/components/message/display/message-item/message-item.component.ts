import { DatePipe } from '@angular/common';
import { MessageDetails } from '../../models/messagedetails.model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.scss'],
  providers: [
    DatePipe
  ],
})
export class MessageItemComponent implements OnInit {

  @Input() details: MessageDetails;
  formattedDate: string;

  constructor(private dateFormatter: DatePipe) { }

  ngOnInit(): void {
    this.formattedDate = this.dateFormatter.transform(this.details?.date, 'MMM dd yyyy | hh:mm:ss');
  }

}
