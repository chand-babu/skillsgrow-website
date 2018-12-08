import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsgrowServicesComponent } from './skillsgrowServices.component';

const routes:Routes=[
    {path:'',component:SkillsgrowServicesComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class SkillsgrowServicesRoutingModule{}
