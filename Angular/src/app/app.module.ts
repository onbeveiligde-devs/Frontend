import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ViewStreamComponent } from './components/view-stream/view-stream.component';
import { ViewSingleStreamComponent } from './components/view-single-stream/view-single-stream.component';
import { RecordStreamComponent } from './components/record-stream/record-stream.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { AppRoutingModule } from './app-routing.module';
import { DiscoveryComponent } from './components/discovery/discovery.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatButtonModule, MatCheckboxModule, MatCardModule, MatFormFieldModule,MatInputModule, MatSnackBarModule} from '@angular/material';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { MatTabsModule } from '@angular/material';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/authentication/login/login.component';
import {FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/authentication/register/register.component'
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { SafePipe } from './pipes/safe.pipe';
import {LogoutComponent} from './components/authentication/logout/logout.component';
import { CheckKeysComponent } from './components/authentication/check-keys/check-keys.component';
import { FilterHtmlPipe } from './pipes/filter-html.pipe';




@NgModule({
  declarations: [
    AppComponent,
    ViewStreamComponent,
    ViewSingleStreamComponent,
    RecordStreamComponent,
    UserListComponent,
    DiscoveryComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    SafePipe,
    LogoutComponent,
    CheckKeysComponent,
    FilterHtmlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    DragDropModule,
    MatTabsModule,
    MatCardModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    DragDropModule,
    CommonModule

  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
