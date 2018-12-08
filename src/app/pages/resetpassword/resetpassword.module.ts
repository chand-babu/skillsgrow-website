import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ResetPasswordRoutingModule } from './resetpassword-routing.module';
import { ResetPasswordComponent } from './resetpassword.component';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ResetPasswordRoutingModule
    ],
    declarations:[ResetPasswordComponent]
})

export class ResetPasswordModule{}