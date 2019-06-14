import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import {ViewSingleStreamComponent} from './components/view-single-stream/view-single-stream.component';


const routes: Routes = [
  { path: 'follow', component: ViewStreamComponent, pathMatch: 'full' },
  { path: 'follow/:id', component: ViewSingleStreamComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
