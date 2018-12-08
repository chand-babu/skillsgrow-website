import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkillsgrowAPIComponent } from './skillsgrowAPI.component';

const routes:Routes=[
    {path:'',component:SkillsgrowAPIComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class SkillsgrowAPIRoutingModule{}
