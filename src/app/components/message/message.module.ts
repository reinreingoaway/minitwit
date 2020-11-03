import { DisplayComponent } from './display/display.component';
import { InputComponent } from './input/input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    InputComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    InputComponent,
    DisplayComponent
  ]
})
export class MessageModule { }
