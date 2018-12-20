import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../guard/login.guard';
import { FileDownloadComponent } from './file-download/file-download.component';
import { HomeComponent } from './home.component'

const homeRoutes: Routes = [
  { path: '', redirectTo: "/file-download", pathMatch: 'full' },
  {
    path: '', canActivate: [LoginGuard], component: HomeComponent,
    children: [
      { path: 'file-download', canActivate: [LoginGuard], component: FileDownloadComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
