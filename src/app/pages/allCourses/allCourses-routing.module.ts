import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AllCoursesComponent } from "./allCourses.component";

const routes:Routes=[
    {path:'',component:AllCoursesComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class AllCoursesRoutingModule{}
