import { MatButtonModule } from '@angular/material/button';
import { MessageItemComponent } from './message-item/message-item.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    MessageItemComponent
  ],
  imports: [
      MatCardModule,
      MatButtonModule
  ],
  exports: [
      MessageItemComponent
  ]
})
export class DisplayModule { }