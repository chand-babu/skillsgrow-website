import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyFormRoutingModule } from './company-form-routing.module';
import { CompanyFormComponent } from './company-form.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatIconModule, MatFormFieldModule,
    MatNativeDateModule,MatInputModule } from '@angular/material';

@NgModule({
    imports:[
        CommonModule,
        CompanyFormRoutingModule,
        HttpClientModule,
        MatDatepickerModule,
        MatIconModule,
        FormsModule, MatFormFieldModule,MatNativeDateModule,MatInputModule
    ],
    declarations:[CompanyFormComponent]
})

export class CompanyFormModule{}