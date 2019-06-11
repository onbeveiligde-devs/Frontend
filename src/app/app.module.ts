import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import { ViewSingleStreamComponent } from './components/view-single-stream/view-single-stream.component';
import { RecordStreamComponent } from './components/record-stream/record-stream.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ViewStreamComponent,
    ViewSingleStreamComponent,
    RecordStreamComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
 