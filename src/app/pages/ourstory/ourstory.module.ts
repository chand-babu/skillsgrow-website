import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OurStoryRoutingModule } from './ourstory-routing.module';
import { OurStoryComponent } from './ourstory.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    imports:[
        CommonModule,
        OurStoryRoutingModule,
        HttpClientModule
    ],
    declarations:[OurStoryComponent]
})

export class OurStoryModule{}