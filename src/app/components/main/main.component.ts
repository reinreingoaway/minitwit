import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  userName= new FormControl('', [Validators.required]);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onEnter(){
    if(!this.userName.untouched)
    {
      this.router.navigate(['twit/',this.userName.value]);
    }
  }

}
