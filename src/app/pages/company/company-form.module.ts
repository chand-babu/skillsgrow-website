import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormRoutingModule } from './company-form-routing.module';
import { CompanyFormComponent } from './company-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports:[
        CommonModule,
        CompanyFormRoutingModule,
        HttpClientModule,
        FormsModule
    ],
    declarations:[CompanyFormComponent]
})

export class CompanyFormModule{}