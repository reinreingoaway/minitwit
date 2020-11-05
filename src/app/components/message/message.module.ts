import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { DisplayComponent } from './display/display.component';
import { InputComponent } from './input/input.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    InputComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    InputComponent,
    DisplayComponent
  ]
})
export class MessageModule { }
