import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginGuard } from '../guard/login.guard';
import { FileManageComponent } from './file-manage/file-manage.component';
import { HomeComponent } from './home.component'

const homeRoutes: Routes = [
  { path: '', redirectTo: "/file-manage", pathMatch: 'full' },
  {
    path: '', canActivate: [LoginGuard], component: HomeComponent,
    children: [
      { path: 'file-manage', canActivate: [LoginGuard], component: FileManageComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
