import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// MODULES
import { AppRoutingModule } from './routing/app-routing.module';
import { AuthModule } from './auth/modules/auth.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog/blog.component';
import { HomeComponent } from './blog/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
