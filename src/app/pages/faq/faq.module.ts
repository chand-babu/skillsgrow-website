import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqRoutingModule } from './faq-routing.module';
import { FAQComponent } from './faq.component';
import { FormsModule } from '@angular/forms';
import { CommonComponentModule } from 'src/app/components/commonComponent.module';

@NgModule({
    imports:[
        CommonModule,
        FaqRoutingModule,
        FormsModule,
        CommonComponentModule
    ],
    declarations:[FAQComponent]
})

export class FaqModule{}