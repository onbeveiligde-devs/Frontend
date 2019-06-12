import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './components/user-list/user-list.component';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';


const routes: Routes = [
  { path: 'follow', component: ViewStreamComponent, pathMatch: 'full' },
  { path: 'discovery', component : DiscoveryComponent, pathMatch: 'full'}
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
