import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublishSkillsgrowComponent } from './publishSkillsgrow.component';

const routes:Routes=[
    {path:'',component:PublishSkillsgrowComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class PublishSkillsgrowRoutingModule{}
