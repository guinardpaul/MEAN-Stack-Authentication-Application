import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Components
import { BlogComponent } from './components/blog/blog.component';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    BlogComponent,
    HomeComponent
  ],
  exports: [
    BlogComponent,
    HomeComponent
  ]
})
export class BlogModule { }
