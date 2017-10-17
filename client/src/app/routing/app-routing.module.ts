import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { NotAuthGuard } from '../guards/not-auth.guard';
import { AuthGuard } from '../guards/auth.guard';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from '../auth/components/login/login.component';
import { RegisterComponent } from '../auth/components/register/register.component';
import { ProfileComponent } from '../auth/components/profile/profile.component';
import { BlogComponent } from '../blog/blog/blog.component';
import { HomeComponent } from '../blog/home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent, canActivate: [ NotAuthGuard ] },
  { path: 'register', component: RegisterComponent, canActivate: [ NotAuthGuard ] },
  { path: 'blog', component: BlogComponent, canActivate: [ AuthGuard ] },
  { path: 'profile', component: ProfileComponent, canActivate: [ AuthGuard ] },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes)
  ],
  declarations: [ NavbarComponent ],
  exports: [ RouterModule, NavbarComponent ]
})
export class AppRoutingModule { }
