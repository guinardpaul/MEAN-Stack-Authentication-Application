import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

// Components
import { RegisterComponent } from '../components/register/register.component';
import { LoginComponent } from '../components/login/login.component';
import { ProfileComponent } from '../components/profile/profile.component';

// Services
import { AuthService } from '../services/auth.service';
import { AuthValidatorService } from '../services/auth-validator.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  declarations: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  exports: [
    RegisterComponent,
    LoginComponent,
    ProfileComponent
  ],
  providers: [
    AuthService,
    AuthValidatorService
  ]
})
export class AuthModule { }
