import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HowSkillsgrowWorksComponent } from './howSkillsgrowWorks.component';

const routes:Routes=[
    {path:'',component:HowSkillsgrowWorksComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class HowSkillsgrowWorksRoutingModule{}
