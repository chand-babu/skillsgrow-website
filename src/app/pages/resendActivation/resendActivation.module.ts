import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResendActivationRoutingModule } from './resendActivtion-routing.module';
import { ResendActivationComponent } from './resendActivation.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ResendActivationRoutingModule
    ],
    declarations:[ResendActivationComponent]
})

export class ResendActivationModule{}