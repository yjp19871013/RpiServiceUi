import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgZorroAntdModule, NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { FileDownloadComponent } from './file-download/file-download.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FilesComponent } from './files/files.component';
import { UserManageComponent } from './user-manage/user-manage.component';

@NgModule({
  declarations: [
    HomeComponent,
    FileDownloadComponent,
    NavbarComponent,
    FilesComponent,
    UserManageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HomeRoutingModule,
    NgZorroAntdModule,
    BrowserAnimationsModule
  ],
  providers: []
})
export class HomeModule { }
