import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InternshipRoutingModule } from './internship-routing.module';
import { InternshipComponent } from './internship.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        InternshipRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    declarations:[InternshipComponent]
})

export class InternshipModule{}