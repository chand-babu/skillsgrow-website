import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsgrowServicesRoutingModule } from './skillsgrowServices-routing.module';
import { SkillsgrowServicesComponent } from './skillsgrowServices.component';

@NgModule({
    imports:[
        CommonModule,
        SkillsgrowServicesRoutingModule
    ],
    declarations:[SkillsgrowServicesComponent]
})

export class SkillsgrowServicesModule{}