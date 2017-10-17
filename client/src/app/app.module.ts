import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';
// MODULES
import { AppRoutingModule } from './routing/app-routing.module';
import { AuthModule } from './auth/modules/auth.module';

import { FlashMsgService } from './shared/flash-msg.service';
// COMPONENTS
import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog/blog.component';
import { HomeComponent } from './blog/home/home.component';

import { AuthGuard } from './guards/auth.guard';
import { NotAuthGuard } from './guards/not-auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    FlashMessagesModule
  ],
  providers: [
    FlashMsgService,
    AuthGuard,
    NotAuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
