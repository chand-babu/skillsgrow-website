import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComingSoonRoutingModule } from './comingsoon-routing.module';
import { ComingSoonComponent } from './comingsoon.component';

@NgModule({
    imports:[
        CommonModule,
        ComingSoonRoutingModule
    ],
    declarations:[ComingSoonComponent]
})

export class ComingSoonModule{}