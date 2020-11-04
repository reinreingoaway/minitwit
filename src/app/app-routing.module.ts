import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './components/main/main.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MessageComponent } from './components/message/message.component';


const routes: Routes = [
  {
    path: '',
    component:MainComponent
  },
  {
    path: 'message',
    component:MessageComponent
  },
  {
    path: '**',
    component:NotFoundComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
