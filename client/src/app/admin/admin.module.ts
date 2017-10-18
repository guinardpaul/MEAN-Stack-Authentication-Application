import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { UserManagementComponent } from './components/user-management/user-management.component';
import { BlogManagementComponent } from './components/blog-management/blog-management.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserManagementComponent,
    BlogManagementComponent
  ],
  exports: [
    UserManagementComponent,
    BlogManagementComponent
  ]
})
export class AdminModule { }
