import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(private location: Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

}
