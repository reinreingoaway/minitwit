import { MessageItemComponent } from './message-item/message-item.component';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    MessageItemComponent
  ],
  imports: [
      MatCardModule
  ],
  exports: [
      MessageItemComponent
  ]
})
export class DisplayModule { }