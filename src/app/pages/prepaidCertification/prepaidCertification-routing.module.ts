import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrePaidCertificationComponent } from './prepaidCertification.component';

const routes:Routes=[
    {path:'',component:PrePaidCertificationComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PrePaidCertificationRoutingModule{}
