import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { ViewSingleStreamComponent } from './components/view-single-stream/view-single-stream.component';
import { RecordStreamComponent } from './components/record-stream/record-stream.component';
import { LoginComponent } from './components/login/login.component';


const routes: Routes = [
  { path: 'follow', component: ViewStreamComponent, pathMatch: 'full' },
  { path: 'discovery', component: DiscoveryComponent, pathMatch: 'full' },
  { path: 'follow/:id', component: ViewSingleStreamComponent, pathMatch: 'full' },
  { path: 'record', component: RecordStreamComponent, pathMatch: 'full' },
  {path : 'login', component : LoginComponent, pathMatch: 'full'}
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
