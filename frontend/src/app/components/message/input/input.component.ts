import { FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MessageDetails } from '../models/messagedetails.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  userName: string;
  message= new FormControl('',[Validators.maxLength(300)]);
  twit: MessageDetails;

  constructor(private location: Location,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('name');
  }

  goBack(){
    this.location.back();
  }

  onPost(){
    if(!this.message.errors?.maxlength)
    {
      this.twit = new MessageDetails(this.userName,
        new Date(),
        this.message.value)
      console.log(this.twit);
    }
    
  }

}
