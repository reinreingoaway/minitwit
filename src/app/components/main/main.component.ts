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
    console.log(this.userName.valueChanges);
    console.log(this.userName);
    if(this.userName.valueChanges)
    {
      this.router.navigate(['twit/',this.userName.value]);
    }
  }

}
