import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';

@NgModule({
    imports:[
        CommonModule,
        LoginRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    declarations:[LoginComponent]
})

export class LoginModule{}