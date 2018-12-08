import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseTestPageComponent } from './courseTestPage.component';

const routes:Routes=[
    {path:'',component:CourseTestPageComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class CourseTestPageRoutingModule{}
