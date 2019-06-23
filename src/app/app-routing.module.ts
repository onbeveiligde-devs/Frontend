import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import { ViewSingleStreamComponent } from './components/view-single-stream/view-single-stream.component';
import { RecordStreamComponent } from './components/record-stream/record-stream.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import {AuthGuard} from './guards/auth.guard';
import {LogoutComponent} from './components/authentication/logout/logout.component';
import {CheckKeysComponent} from './components/authentication/check-keys/check-keys.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'keys', component: CheckKeysComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'follow', component: ViewStreamComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'discovery', component: DiscoveryComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'follow/:id', component: ViewSingleStreamComponent, pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'record', component: RecordStreamComponent, pathMatch: 'full', canActivate: [AuthGuard] },
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
