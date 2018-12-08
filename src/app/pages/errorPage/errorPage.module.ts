import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPageRoutingModule } from './errorPage-routing.module';
import { ErrorPageComponent } from './errorPage.component';

@NgModule({
    imports:[
        CommonModule,
        ErrorPageRoutingModule
    ],
    declarations:[ErrorPageComponent]
})

export class ErrorPageModule{}