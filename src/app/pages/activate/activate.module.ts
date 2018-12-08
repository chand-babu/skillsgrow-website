import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivateRoutingModule } from './activate-routing.module';
import { AccountActivationComponent } from './activate.component';

@NgModule({
    imports:[
        CommonModule,
        ActivateRoutingModule
    ],
    declarations:[AccountActivationComponent]
})

export class ActivateModule{}