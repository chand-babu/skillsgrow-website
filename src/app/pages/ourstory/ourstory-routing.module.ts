import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OurStoryComponent } from "./ourstory.component";

const routes:Routes=[
    {path:'',component:OurStoryComponent}
]

@NgModule({
    imports:[RouterModule.forChild(routes)],
    exports:[RouterModule]
})

export class OurStoryRoutingModule{}
