import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactUsRoutingModule } from './contactus-routing.module';
import { ContactUsComponent } from './contactus.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonComponentModule } from './../../components/commonComponent.module';

@NgModule({
    imports: [
        CommonModule,
        ContactUsRoutingModule,
        HttpClientModule,
        FormsModule,
        CommonComponentModule
    ],
    declarations: [ContactUsComponent]
})

export class ContactUsModule { }
