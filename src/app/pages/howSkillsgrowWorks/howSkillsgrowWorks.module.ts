import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowSkillsgrowWorksRoutingModule } from './howSkillsgrowWorks-routing.module';
import { HowSkillsgrowWorksComponent } from './howSkillsgrowWorks.component';

@NgModule({
    imports:[
        CommonModule,
        HowSkillsgrowWorksRoutingModule
    ],
    declarations:[HowSkillsgrowWorksComponent]
})

export class HowSkillsgrowWorksModule{}