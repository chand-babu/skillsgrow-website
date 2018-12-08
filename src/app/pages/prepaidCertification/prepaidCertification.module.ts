import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrePaidCertificationRoutingModule } from './prepaidCertification-routing.module';
import { PrePaidCertificationComponent } from './prepaidCertification.component';

@NgModule({
    imports:[
        CommonModule,
        PrePaidCertificationRoutingModule
    ],
    declarations:[PrePaidCertificationComponent]
})

export class PrePaidCertificationModule{}