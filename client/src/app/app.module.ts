import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlashMessagesModule } from 'angular2-flash-messages';

// MODULES
import { AppRoutingModule } from './routing/app-routing.module';
import { AuthModule } from './auth/auth.module';
import { BlogModule } from './blog/blog.module';
import { AdminModule } from './admin/admin.module';

// Services
import { AuthService } from './auth/services/auth.service';
import { AuthValidatorService } from './auth/services/validators/auth-validator.service';
import { FlashMsgService } from './shared/flash-msg.service';

// Guards
import { AuthGuard } from './routing/guards/auth.guard';
import { NotAuthGuard } from './routing/guards/not-auth.guard';

// Components
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    BlogModule,
    AdminModule,
    FlashMessagesModule
  ],
  providers: [
    FlashMsgService,
    AuthService,
    AuthValidatorService,
    AuthGuard,
    NotAuthGuard
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
