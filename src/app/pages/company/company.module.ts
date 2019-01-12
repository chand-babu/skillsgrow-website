import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CompanyFormRoutingModule } from './company-routing.module';
import { CompanyComponent } from './company.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule, MatIconModule, MatFormFieldModule,
    MatNativeDateModule,MatInputModule, MatTableModule } from '@angular/material';
import { CompanyFormComponent } from './company-form/company-form.component';
import { CompanyLoginComponent } from './login/company-login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
    imports:[
        CommonModule,
        CompanyFormRoutingModule,
        HttpClientModule,
        MatDatepickerModule,
        MatIconModule,
        FormsModule, MatFormFieldModule,
        MatNativeDateModule,MatInputModule,
        MatTableModule,
        NgbModule
    ],
    declarations:[CompanyComponent, CompanyFormComponent, CompanyLoginComponent, DashboardComponent]
})

export class CompanyModule{}