import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        RegisterRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    declarations:[RegisterComponent]
})

export class RegisterModule{}