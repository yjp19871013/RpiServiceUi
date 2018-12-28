import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilesComponent } from './files/files.component';

@NgModule({
  declarations: [
    HomeComponent,
    FileDownloadComponent,
    NavbarComponent,
    FilesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HomeRoutingModule
  ],
  providers: []
})
export class HomeModule { }
