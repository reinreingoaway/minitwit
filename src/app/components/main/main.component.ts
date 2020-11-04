import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userName= new FormControl();

  constructor() { }

  ngOnInit(): void {
  }

  onEnter(){
    console.log(this.userName.value);
  }

}
