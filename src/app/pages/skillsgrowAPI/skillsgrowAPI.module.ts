import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkillsgrowAPIRoutingModule } from './skillsgrowAPI-routing.module';
import { SkillsgrowAPIComponent } from './skillsgrowAPI.component';

@NgModule({
    imports:[
        CommonModule,
        SkillsgrowAPIRoutingModule
    ],
    declarations:[SkillsgrowAPIComponent]
})

export class SkillsgrowAPIModule{}