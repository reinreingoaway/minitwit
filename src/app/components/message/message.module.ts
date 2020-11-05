import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisplayModule } from './display/display.module';
import { DisplayComponent } from './display/display.component';
import { InputComponent } from './input/input.component';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    InputComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule
    MatIconModule,
    DisplayModule,
    HttpClientModule
  ],
  exports: [
    InputComponent,
    DisplayComponent
  ]
})
export class MessageModule { }
