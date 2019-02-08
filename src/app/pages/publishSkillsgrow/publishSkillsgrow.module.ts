import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublishSkillsgrowRoutingModule } from './publishSkillsgrow-routing.module';
import { PublishSkillsgrowComponent } from './publishSkillsgrow.component';
import { FormsModule } from '@angular/forms';
import { CommonComponentModule } from './../../components/commonComponent.module';

@NgModule({
    imports: [
        CommonModule,
        PublishSkillsgrowRoutingModule,
        FormsModule,
        CommonComponentModule
    ],
    declarations: [PublishSkillsgrowComponent]
})

export class PublishSkillsgrowModule {}
