import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardPageComponent } from './pages/board-page/board-page.component';

const routes: Routes = [
  { path: '/:id', component: BoardPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoardRoutingModule { }
